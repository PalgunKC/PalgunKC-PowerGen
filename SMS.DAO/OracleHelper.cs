using System;
using System.IO;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using SMS.UTILITY;
using Newtonsoft.Json;
using System.Data.OracleClient;
using System.Configuration;
using System.Transactions;
using System.Reflection;
using System.Web.Http;

namespace SAMS.DAO
{
    public class OracleHelper : IDisposable
    {

        #region Declaration

        OracleConnection connection;
        private string rowUniqueParmName = "";
        private bool getRowUniqueId = false;
        private const string PARAMETER_DELIMITER = "?";
        public string CurrentConnectionString = ConfigurationManager.ConnectionStrings["PDDConnection"].ConnectionString;
        public OracleHelper()
        {
            connection = new OracleConnection(CurrentConnectionString);
        }
        #endregion

        #region Connection
        /// <summary>
        /// This method helps in opening the MYSQL Connection
        /// </summary>
        /// <returns>Returning mysql connection</returns>
        /// <exception cref="MySQLException">Problem in opening sql connection</exception>
        /// <exception cref="InvalidOperationException">The connection is open already</exception>
        private OracleConnection OpenConnection()
        {
            try
            {
                if (HttpContext.Current.Session != null && HttpContext.Current.Session[Common.SESSION_VARIABLES.CONNECTION_STRING] != null)
                {
                    CurrentConnectionString = HttpContext.Current.Session[Common.SESSION_VARIABLES.CONNECTION_STRING].ToString();
                }
                else
                {
                    CurrentConnectionString = ConfigurationManager.ConnectionStrings["PDDConnection"].ConnectionString;
                }
                if (connection.State == ConnectionState.Closed)
                {
                    connection.ConnectionString = CurrentConnectionString;
                    connection.Open();
                }
            }
            catch (InvalidOperationException ex)
            {
                using (ErrorLog objlog = new ErrorLog())
                {
                    objlog.WriteError(ex);
                }
            }
            catch (Exception ex)
            {
                using (ErrorLog objlog = new ErrorLog())
                {
                    objlog.WriteError(ex);
                }
            }

            return connection;
        }
        //public void SetConnectionType()
        //{
        //    connection = new OracleConnection(CurrentConnectionString);
        //}
        public void SetConnectionType()
        {
            string s = ConfigurationManager.ConnectionStrings["SAMSConnection"].ConnectionString;
            connection = new OracleConnection(s);
        }
        /// <summary>
        /// This method helps in closing the connection
        /// </summary>
        private void CloseConnection()
        {
            if (connection != null)
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        #endregion

        #region MySql Data Types
        /// <summary>Get the .Net Data Type and return the corresponding MySql Datatype </summary>
        /// <param name="fieldType">.Net DataType Enumerator</param>
        /// <returns>MySqlDataType</returns>
        private OracleType GetOracleFieldType(EnumCommand.DataType fieldType)
        {
            switch (fieldType)
            {
                case EnumCommand.DataType.Byte:
                    { return OracleType.Byte; }
                case EnumCommand.DataType.Char:
                    { return OracleType.VarChar; }
                case EnumCommand.DataType.DateTime:
                    { return OracleType.DateTime; }
                case EnumCommand.DataType.TimeSpan:
                    { return OracleType.Timestamp; }
                case EnumCommand.DataType.Double:
                case EnumCommand.DataType.Decimal:
                case EnumCommand.DataType.Int16:
                case EnumCommand.DataType.UInt16:
                    { return OracleType.Int16; }
                case EnumCommand.DataType.Int:
                case EnumCommand.DataType.Int32:
                case EnumCommand.DataType.UInt32:
                    { return OracleType.Int32; }
                case EnumCommand.DataType.Int64:
                case EnumCommand.DataType.ByteArray:
                    { return OracleType.Blob; }
                case EnumCommand.DataType.Blob:
                    { return OracleType.Blob; }
                case EnumCommand.DataType.Varchar:
                    { return OracleType.VarChar; }
                default:
                    { return OracleType.VarChar; }
            }
        }
        #endregion

        #region Execute Command

        //Execute the insert,update,delete queries
        //LAST_INSERT_ID if set to true bind last insert id in the result args
        public ResultArgs ExecuteCommand(string query, bool getLastInserID)
        {
            return ExecuteCommand(null, query, getLastInserID);
        }

        /// <summary>Execute the Insert,Update,Delete Query </summary>           
        /// <param name="dv">DataValue Object</param>
        /// <param name="query">The Insert,Update or Delete Query</param>
        /// <param name="getlastinsert_ID">LAST_INSERT_ID if set to true
        /// bind last insert id in the result args</param>
        /// <returns>Number of Rows Affected by the Query
        /// greater than 1 --> success
        /// 0 --> failure
        /// -1  --> table referred(delete mode)
        /// -2 --> record referred(delete mode)
        /// </returns>
        /// <exception name="ArgumentNullException"></exception>  
        /// <exception name="InvalidOperationException"></exception>  
        public ResultArgs ExecuteCommand(OracleParameter[] dv, string query, bool getlastinsert_ID, EnumCommand.SQLType sqlType = EnumCommand.SQLType.Static, string spOutput = null)
        {
            ResultArgs result = new ResultArgs();
            result.Success = false;
            OracleCommand Command = null;
            OracleConnection Con = OpenConnection();
            try
            {
                if (string.IsNullOrEmpty(query))
                {
                    //throw new ArgumentNullException("Query is empty", "ExecuteCommand(DataValue dv, string query"); 
                    using (ErrorLog objlog = new ErrorLog())
                    {
                        objlog.WriteError("Error Handler", "ExecuteCommand(DataValue,string)", query, "Query is empty!");
                    }
                }
                else
                {
                    if (dv == null)
                        Command = new OracleCommand(query, Con);

                    else
                        Command = SetOracleCommand(dv, query, Con, sqlType);

                    if (spOutput != null)
                    {
                        OracleParameter outParameter = new OracleParameter(spOutput, GetOracleFieldType(EnumCommand.DataType.Int64));
                        outParameter.Direction = ParameterDirection.Output;
                        Command.Parameters.Add(outParameter);
                    }
                    result.RowsAffected = Command.ExecuteNonQuery();
                    if (spOutput != null)
                    {
                        result.ReturnValue = Command.Parameters[spOutput].Value;
                    }

                    //get the last insert id if flag is set to true
                    if (getlastinsert_ID)
                    {
                        getRowUniqueId = getlastinsert_ID; //Set true to return the last insert id - not handled for stored procedure
                        SetRowUniqueIdentifierValue(result, Command);
                    }
                    result.Success = true;
                }
            }
            catch (InvalidOperationException ex)
            {
                //throw new InvalidOperationException("Problem in Execute Command " + iex.Message, iex);                
                result.RowsAffected = ex.Message.ToLower().Contains("foreign keys") ? -1 : ex.Message.ToLower().Contains("integrity constraint") ? -2 : 0;

                using (ErrorLog objHandler = new ErrorLog())
                {
                    objHandler.WriteError("Error Handler", "ExecuteCommand(DataValue,string)", query + "Err MSg: " + ex.Message, "Query is empty!");
                    // objHandler.WriteLogtoDB(ex, "ExecuteCommand(DataValue dv, string query)", "MysqlHandler");
                }
            }
            catch (Exception ex)
            {

                result.RowsAffected = ex.Message.ToLower().Contains("foreign key") ? -1 : ex.Message.ToLower().Contains("integrity constraint") ? -2 : 0;

                using (ErrorLog objHandler = new ErrorLog())
                {
                    objHandler.WriteError("Error Handler", "ExecuteCommand(DataValue,string)", query + "Err MSg: " + ex.Message, "Query is empty!");
                    objHandler.WriteError("MysqlHandler", "ExecuteCommand(DataValue dv, string query)", ex.Message);
                }
            }
            finally
            {
                if (Command != null)
                    Command.Dispose();
                Command = null;
                CloseConnection();
            }
            return result;
        }


        /// <summary>
        /// This method is to execute sql with image data.(member identity details are saveed through this method)
        /// </summary>
        /// <param name="dv">data value</param>
        /// <param name="query">query</param>
        /// <param name="imageByte">member photo</param>
        /// <param name="thumbByte">thumb impression</param>
        /// <param name="digitalByte">digital signature</param>
        /// <returns>1 --> success
        /// 0 or le 0 --> failure</returns>
        public int ExecuteByte(OracleParameter[] dv, string query, byte[] imageByte, byte[] thumbByte, byte[] digitalByte, EnumCommand.SQLType sqlType = EnumCommand.SQLType.Static)
        {
            int RowsAffected = 0;
            OracleCommand Command = null;
            OracleConnection Con = OpenConnection();
            try
            {
                Command = SetOracleCommand(dv, query, Con, sqlType);
                //if (imageByte.Length>0)
                Command.Parameters.Add("?PHOTO", OracleType.Blob, imageByte.Length, "PHOTO").Value = (object)imageByte;

                //if (thumbByte.Length>0)
                Command.Parameters.Add("?THUMB_IMPRESSION", OracleType.Blob, thumbByte.Length, "THUMB_IMPRESSION").Value = (object)thumbByte;

                //if (digitalByte.Length>0)
                Command.Parameters.Add("?DIGITAL_SIGNATURE", OracleType.Blob, digitalByte.Length, "DIGITAL_SIGNATURE").Value = (object)digitalByte;

                RowsAffected = Command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {

                using (ErrorLog objHandler = new ErrorLog())
                {
                    objHandler.WriteError("MysqlHandler", "ExecuteByte(DataValue dv, string query, byte[] imageByte, byte[] thumbByte, byte[] digitalByte)", ex.Message);
                    objHandler.WriteError(ex);
                }
            }
            finally
            {
                if (Command != null)
                    Command.Dispose();
                Command = null;
                CloseConnection();
            }
            //ServicedComponent.DisposeObject(this);
            return RowsAffected;
        }
        /// <summary>
        /// This method is to execute sql with image data.(nominee identity details are saveed through this method)
        /// </summary>
        /// <param name="dv">data value</param>
        /// <param name="query">query</param>
        /// <param name="digitalByte">digital signature</param>
        /// <returns>1 --> success
        /// 0 or le 0 --> failure</returns>
        public int ExecuteByte(OracleParameter[] dv, string query, byte[] digitalByte, int type, EnumCommand.SQLType sqlType = EnumCommand.SQLType.Static)
        {
            int RowsAffected = 0;
            OracleCommand Command = null;
            OracleConnection Con = OpenConnection();
            try
            {
                Command = SetOracleCommand(dv, query, Con, sqlType);
                if (type > 0)
                {
                    //if (digitalByte.Length>0)
                    Command.Parameters.Add("?SIGNATURE", OracleType.Blob, digitalByte.Length, "SIGNATURE").Value = (object)digitalByte;
                }
                else
                {
                    //if (digitalByte.Length > 0)
                    Command.Parameters.Add("?PHOTO", OracleType.Blob, digitalByte.Length, "PHOTO").Value = (object)digitalByte;
                }

                RowsAffected = Command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {

                using (ErrorLog objHandler = new ErrorLog())
                {
                    objHandler.WriteError("MysqlHandler", "ExecuteByte(DataValue dv, string query, byte[] digitalByte)", ex.Message);
                    objHandler.WriteError(ex);
                }
            }
            finally
            {
                if (Command != null)
                    Command.Dispose();
                Command = null;
                CloseConnection();
            }
            //ServicedComponent.DisposeObject(this);
            return RowsAffected;
        }
        /// <summary>
        /// This method is to execute the logo image details
        /// </summary>
        /// <param name="dv">data value</param>
        /// <param name="query">query</param>
        /// <param name="imageByte">logo image in bytes</param>
        /// <returns>1 --> success
        /// 0 or le 0 --> failure</returns>
        public int ExecuteLogoByte(OracleParameter[] dv, string query, byte[] imageByte, EnumCommand.SQLType sqlType = EnumCommand.SQLType.Static)
        {
            int RowsAffected = 0;
            OracleCommand Command = null;
            OracleConnection Con = OpenConnection();
            try
            {
                Command = SetOracleCommand(dv, query, Con, sqlType);
                if (imageByte != null)
                    Command.Parameters.Add("?LOGO", OracleType.Blob, imageByte.Length, "LOGO").Value = (object)imageByte;
                RowsAffected = Command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                using (ErrorLog objHandler = new ErrorLog())
                {
                    objHandler.WriteError("MysqlHandler", "ExecuteLogoByte(DataValue dv, string query, byte[] imageByte)", ex.Message);
                    objHandler.WriteError(ex);
                }
            }
            finally
            {
                if (Command != null)
                    Command.Dispose();
                Command = null;
                CloseConnection();
            }
            //ServicedComponent.DisposeObject(this);
            return RowsAffected;
        }

        /// <summary>
        /// This mehtod is to save image byte
        /// </summary>
        /// <param name="dv">data values</param>
        /// <param name="query">query</param>
        /// <param name="imageByte">imageByte</param>
        /// <param name="fieldName">parametername</param>
        /// <returns>1 --> success
        /// 0 or le 0 --> failure</returns>
        public int ExecuteImageByte(OracleParameter[] dv, string query, byte[] imageByte, string fieldName, EnumCommand.SQLType sqlType = EnumCommand.SQLType.Static)
        {
            int RowsAffected = 0;
            OracleCommand Command = null;
            OracleConnection Con = OpenConnection();
            try
            {
                Command = SetOracleCommand(dv, query, Con, sqlType);
                //if (imageByte.Length>0)
                Command.Parameters.Add("?" + fieldName, OracleType.Blob, imageByte.Length, fieldName).Value = (object)imageByte;

                RowsAffected = Command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                using (ErrorLog objHandler = new ErrorLog())
                {
                    objHandler.WriteError("MysqlHandler", "ExecuteImageByte(DataValue dv, string query, byte[] imageByte)", ex.Message);
                    objHandler.WriteError(ex);
                }
            }
            finally
            {
                if (Command != null)
                    Command.Dispose();
                Command = null;
                CloseConnection();
            }
            return RowsAffected;
        }

        #endregion

        #region Execute Scalar

        //Execute Scalar functions
        public ResultArgs ExecuteScalar(string query)
        {
            return ExecuteScalar(null, query);
        }

        /// <summary>Execute Scalar Query </summary>           
        /// <param name="dv">DataValue Object</param>
        /// <param name="query">The Select Query</param>
        /// <returns>If The Execute Scalar Returns the Null, the function will return
        /// the empty string otherwise the value</returns>
        /// <exception name="ArgumentNullException"></exception>  
        /// <exception name="InvalidOperationException"></exception>  
        public ResultArgs ExecuteScalar(OracleParameter[] dv, string query, EnumCommand.SQLType sqlType = EnumCommand.SQLType.Static)
        {
            ResultArgs resultArgs = new ResultArgs();
            string ScalarValue = string.Empty;
            OracleCommand Command = null;
            OracleConnection Con = OpenConnection();
            try
            {
                if (string.IsNullOrEmpty(query))
                {
                    // throw new ArgumentNullException("Query is empty!", "ExecuteScalar(DataValue dv, string query)"); 
                    using (ErrorLog objlog = new ErrorLog())
                    {
                        objlog.WriteError("Error Handler", "ExecuteScalar(DataValue,string)", query, "Query is empty!");
                    }
                }
                if (dv == null)
                    Command = new OracleCommand(query, Con);
                else
                    Command = SetOracleCommand(dv, query, Con, sqlType);
                Object obj = Command.ExecuteScalar();
                if (obj != null)
                {
                    ScalarValue = obj.ToString();
                    resultArgs.Success = true;
                }
            }
            catch (InvalidOperationException ex)
            {

                using (ErrorLog objHandler = new ErrorLog())
                {
                    objHandler.WriteError("MysqlHandler", "ExecuteScalar(DataValue dv, string query)", ex.Message);
                    objHandler.WriteError(ex);
                }
            }
            catch (Exception ex)
            {

                using (ErrorLog objHandler = new ErrorLog())
                {
                    objHandler.WriteError("MysqlHandler", "ExecuteScalar(DataValue dv, string query)", ex.Message);
                    objHandler.WriteError(ex);
                }
            }
            finally
            {
                if (Command != null)
                    Command.Dispose();
                Command = null;
                CloseConnection();
            }
            resultArgs.StringResult = ScalarValue;
            return resultArgs;
        }

        #endregion
        #region Fetch Data In List
        public static ResultArgs FetchData<T>(OracleParameter[] param, string sSQL, EnumCommand.DataSource dataSourceType, string sAcademicYear = "") where T : new()
        {
            ResultArgs resultArgs = new ResultArgs();
            DataValue dv = new DataValue();
            dv.Clear();
            try
            {
                if (string.IsNullOrEmpty(sSQL))
                {
                    resultArgs.Success = false;
                    resultArgs.Message = Common.Message.QueryIsEmpty;
                    return resultArgs;
                }
                if (sAcademicYear != string.Empty)
                    sSQL = sSQL.Replace(Common.Delimiter.QUS + "", sAcademicYear);
                //if (param != null)
                //{
                //    DataValue Construction 
                //    foreach (var prop in obj.GetType().GetProperties())
                //    {
                //        objValue = prop.GetValue(obj, null);
                //        objValue = (objValue == null) ? string.Empty : objValue.ToString();
                //        dv.Add(prop.Name, objValue.ToString(), EnumCommand.DataType.String);
                //    }
                //}
                if (dataSourceType == EnumCommand.DataSource.list)
                {
                    using (OracleHelper objHelper = new OracleHelper())
                    {
                        resultArgs = objHelper.FecthDataAsList<T>(sSQL, param, EnumCommand.SQLType.StoredProcedure);
                    }
                }
                else
                {
                    using (OracleHelper objHelper = new OracleHelper())
                    {
                        resultArgs = objHelper.FetchData(sSQL, dataSourceType, param, EnumCommand.SQLType.StoredProcedure);
                    }
                }
            }
            catch (System.Exception ex)
            {
                using (ErrorLog objlog = new ErrorLog())
                {
                    objlog.WriteError("OracleHelper", "FetchData", sSQL, ex.Message);
                }
                resultArgs.Success = false;
            }
            return resultArgs;
        }
        #endregion

        #region Fetch Data

        public ResultArgs FecthDataAsList<T>(string query, OracleParameter[] param, EnumCommand.SQLType sqlType = EnumCommand.SQLType.Static) where T : new()
        {
            ResultArgs result = new ResultArgs();
            result.Success = false;
            OracleCommand Command = null;
            DataSet ds = new DataSet();
            OracleConnection Con = OpenConnection();

            List<T> res = new List<T>();
            try
            {
                if (string.IsNullOrEmpty(query))
                {
                    //throw new ArgumentNullException("Query is empty", "FetchData(DataValue dv, string query)"); 
                    using (ErrorLog objlog = new ErrorLog())
                    {
                        result.Success = false;
                        objlog.WriteError("Error Handler", "FetchData(DataValue,string)", query, "Query is empty!");
                    }
                }
                else
                {

                    if (param == null)
                        Command = new OracleCommand(query, Con);
                    else
                        Command = SetOracleCommand(param, query, Con, sqlType);
                    result.dataSource = null;
                    try
                    {
                        if (Con.State == ConnectionState.Open && Command != null)
                        {
                            result.dataSource = Command.ExecuteReader();
                            OracleDataReader OracleDataReader = ((OracleDataReader)result.dataSource);
                            result.RowsAffected = ((OracleDataReader)result.dataSource).RecordsAffected;
                            result.Success = true;
                            Command.Parameters.Clear();
                            if (OracleDataReader.HasRows)
                            {
                                while (OracleDataReader.Read())
                                {
                                    T t = new T();
                                    object objValue;
                                    for (int inc = 0; inc < OracleDataReader.FieldCount; inc++)
                                    {
                                        objValue = null;
                                        Type type = t.GetType();
                                        PropertyInfo prop = type.GetProperty(OracleDataReader.GetName(inc));
                                        objValue = OracleDataReader.GetValue(inc).ToString();
                                        if (objValue == DBNull.Value || objValue == "") objValue = null;
                                        prop.SetValue(t, objValue, null);
                                    }
                                    res.Add(t);
                                }
                                result.DataSource.Data = res;
                            }

                        }
                    }
                    catch (Exception e)
                    {
                        //Update Exception
                        result.Exception = e;
                        result.Success = false;
                        using (ErrorLog objlog = new ErrorLog())
                        {
                            objlog.WriteError("Error Handler", "FetchData(DataValue,string)", query, e.Message + " Query is empty!");
                        }
                        //new ErrorLog().WriteError("MySQLDataHandler", "Fetch", e.Message, Command.CommandText, CommonMethods.GetExceptionLineNo(e));
                    }
                    finally
                    {
                        // CloseConnection(TransactionType.None);
                        Command.Parameters.Clear();
                        CloseConnection();
                    }
                }
            }
            catch (Exception ex)
            {
                result.Success = false;
                using (ErrorLog objHandler = new ErrorLog())
                {
                    objHandler.WriteError("MysqlHandler", "FetchData", ex.Message);
                }
            }
            finally
            {
                if (Command != null)
                    Command.Dispose();
                Command = null;
                CloseConnection();
            }

            return result;

        }

        /// <summary>Execute the Select Query  </summary>           
        /// <param name="dv">DataValue Object</param>
        /// <param name="query">The Select Query</param>
        /// <returns>DataTable with the records</returns>
        /// <exception name="ArgumentNullException"></exception>  
        /// <exception name="InvalidOperationException"></exception>  
        public ResultArgs FetchData(string query, EnumCommand.DataSource dataSourceType, OracleParameter[] dv = null, EnumCommand.SQLType sqlType = EnumCommand.SQLType.Static)
        {
            ResultArgs result = new ResultArgs();
            result.Success = false;
            OracleDataAdapter Adapter;
            OracleCommand Command = null;
            DataSet ds = new DataSet();
            OracleConnection Con = OpenConnection();
            try
            {
                if (string.IsNullOrEmpty(query))
                {
                    //throw new ArgumentNullException("Query is empty", "FetchData(DataValue dv, string query)"); 
                    using (ErrorLog objlog = new ErrorLog())
                    {
                        result.Success = false;
                        objlog.WriteError("Error Handler", "FetchData(DataValue,string)", query, "Query is empty!");
                    }
                }
                else
                {

                    if (dv == null)
                        Command = new OracleCommand(query, Con);
                    else
                        Command = SetOracleCommand(dv, query, Con, sqlType);

                    result.dataSource = null;
                    try
                    {
                        if (Con.State == ConnectionState.Open && Command != null)
                        {
                            switch (dataSourceType)
                            {
                                case EnumCommand.DataSource.DataSet:
                                    {
                                        Adapter = new OracleDataAdapter(Command);
                                        if (result.dataSource == null) result.dataSource = new DataSet();
                                        result.RowsAffected = Adapter.Fill(result.dataSource as DataSet);
                                        result.Success = true;
                                        break;
                                    }
                                case EnumCommand.DataSource.DataView:
                                    {
                                        Adapter = new OracleDataAdapter(Command);
                                        if (result.dataSource == null) result.dataSource = new DataTable();
                                        result.RowsAffected = Adapter.Fill(result.dataSource as DataTable);
                                        result.dataSource = ((DataTable)result.dataSource).DefaultView;
                                        result.Success = true;
                                        break;
                                    }
                                case EnumCommand.DataSource.DataReader:
                                    {
                                        result.dataSource = Command.ExecuteReader();
                                        result.RowsAffected = ((OracleDataReader)result.dataSource).RecordsAffected;
                                        result.Success = true;
                                        break;
                                    }
                                case EnumCommand.DataSource.Scalar:
                                    {
                                        result.dataSource = Command.ExecuteScalar();
                                        if (result.dataSource != null)
                                        {
                                            result.RowsAffected = 1;
                                            result.Success = true;
                                        }
                                        else
                                        {
                                            result.RowsAffected = 0;
                                            result.Success = true;
                                        }

                                        break;
                                    }

                                default:
                                    {
                                        Adapter = new OracleDataAdapter(Command);
                                        if (result.dataSource == null) result.dataSource = new DataTable();
                                        result.RowsAffected = Adapter.Fill(result.dataSource as DataTable);
                                        result.Success = true;
                                        break;
                                    }
                            }
                        }
                    }
                    catch (Exception e)
                    {
                        //Update Exception
                        result.Exception = e;
                        result.Success = false;
                        using (ErrorLog objlog = new ErrorLog())
                        {
                            objlog.WriteError("Error Handler", "FetchData(DataValue,string)", query, e.Message + " Query is empty!");
                        }
                        //new ErrorLog().WriteError("MySQLDataHandler", "Fetch", e.Message, Command.CommandText, CommonMethods.GetExceptionLineNo(e));
                    }
                    finally
                    {
                        // CloseConnection(TransactionType.None);
                        CloseConnection();
                    }

                    //result.ShowMessage("Updated");
                    if (result.Success)
                    {

                        result.DataSource.Data = result.dataSource;
                    }
                    //Adapter = new OracleDataAdapter(Command);
                    //Adapter.Fill(ds);
                }
            }
            catch (Exception ex)
            {
                result.Success = false;
                using (ErrorLog objHandler = new ErrorLog())
                {
                    objHandler.WriteError("MysqlHandler", "FetchData", ex.Message);
                }
            }
            finally
            {
                if (Command != null)
                    Command.Dispose();
                Command = null;
                CloseConnection();
            }
            return result;
        }



        public ResultArgs GetDataBaseName(DataValue dv)
        {
            ResultArgs result = new ResultArgs();
            OracleDataAdapter Adapter;
            OracleCommand Command = null;
            DataSet ds = new DataSet();

            string connection = "server=" + dv.GetItem(0).FieldValue + ";port=" + dv.GetItem(1).FieldValue + ";uid=" + dv.GetItem(2).FieldValue + ";pwd=" + dv.GetItem(3).FieldValue + ";Allow User Variables=True;";
            string sFetchQuery = "show databases";
            DataTable dtFetchDb = new DataTable();
            if (dv != null)
            {
                OracleConnection mcon = new OracleConnection(connection);
                mcon.Open();
                Command = new OracleCommand(sFetchQuery, mcon);
                Adapter = new OracleDataAdapter(Command);
                if (result.dataSource == null) result.dataSource = new DataTable();
                result.RowsAffected = Adapter.Fill(result.dataSource as DataTable);
                result.Success = true;
            }
            return result;
        }
        public ResultArgs CreateDataBase(DataValue dv)
        {
            ResultArgs result = new ResultArgs();
            OracleCommand Command = null;

            string connection = "server=" + dv.GetItem(0).FieldValue + ";port=" + dv.GetItem(1).FieldValue + ";uid=" + dv.GetItem(2).FieldValue + ";pwd=" + dv.GetItem(3).FieldValue + ";Allow User Variables=True;";
            string sCreateQuery = "Create database " + dv.GetItem(4).FieldValue;
            DataTable dtFetchDb = new DataTable();
            if (dv != null)
            {
                OracleConnection mcon = new OracleConnection(connection);
                mcon.Open();
                Command = new OracleCommand(sCreateQuery, mcon);
                Command.ExecuteNonQuery();
                mcon.Close();
            }
            return result;
        }
        #endregion
        #region Set Mysql Commnad with parameters

        /// <summary>Add the parameter name, value and data type to the MySql Command Object </summary>           
        /// <param name="dv">DataValue Object</param>
        /// <param name="query">The Insert,Update,Delete or Select Query </param>
        /// <returns>MySql Command</returns>
        private OracleCommand SetOracleCommand(OracleParameter[] param, string query, OracleConnection connection, EnumCommand.SQLType sqlType)
        {
            string Param = "";
            string FieldName = "";
            OracleCommand Command = new OracleCommand(query, connection);
            Command.CommandType = (sqlType == EnumCommand.SQLType.StoredProcedure) ? CommandType.StoredProcedure : CommandType.Text;
            if (param != null)
            {
                foreach (OracleParameter p in param)
                {
                    if (p != null)
                    {
                        // Check for derived output value with no value assigned
                        if ((p.Direction == ParameterDirection.InputOutput ||
                            p.Direction == ParameterDirection.Input) &&
                            (p.Value == null))
                        {
                            p.Value = DBNull.Value;
                        }
                        Command.Parameters.Add(p);
                    }
                }
            }
            return Command;
        }

        /// <summary>Check a parameter is available in the query </summary>
        /// <param name="query">The Select,Insert,Update or Delete Query</param>
        /// <param name="fieldName">The Filed Name</param>
        /// <returns>if the query contains the field,it return the filed name other wise returns the empty</returns>
        private string GetParameter(string query, string fieldName, EnumCommand.SQLType sqlType)
        {
            string param = fieldName;
            if (sqlType == EnumCommand.SQLType.Static)
            {
                param = fieldName.ToUpper();
                param = query.Contains(param) ? param : string.Empty;
            }
            return param;
        }
        #endregion

        #region Row Unique Identifier

        private void SetRowUniqueIdentifierValue(ResultArgs result, OracleCommand OracleCommand)
        {
            if (OracleCommand.CommandType == CommandType.StoredProcedure)
            {
                OracleParameterCollection OracleParameterCollection = OracleCommand.Parameters;
                string paramName = "";

                foreach (OracleParameter OracleParameter in OracleParameterCollection)
                {
                    if (OracleParameter.ParameterName == rowUniqueParmName)
                    {
                        paramName = RemoveParameterDelimiter(OracleParameter.ParameterName);
                        result.RowUniqueIdCollection[paramName] = OracleParameter.Value;
                        break;
                    }
                }
            }
            else
            {
                if (getRowUniqueId)
                {
                    string sQuery = "SELECT LAST_INSERT_ID()";
                    OracleCommand.CommandText = sQuery;
                    OracleCommand.CommandType = CommandType.Text;
                    result.RowUniqueId = OracleCommand.ExecuteScalar().ToString();
                }
            }
        }

        private string RemoveParameterDelimiter(string parameterName)
        {
            string paramName = parameterName.Replace(PARAMETER_DELIMITER, "");
            return paramName;
        }

        private void ParseException(ResultArgs result, Exception e)
        {
            string errorMessage = e.Message;
            string message = errorMessage;

            int posStart = 0;
            int posEnd = 0;

            //Validation Message for Adding/Updating duplicate value
            posStart = errorMessage.ToLower().IndexOf("duplicate entry");

            if (posStart >= 0)
            {
                posStart = errorMessage.IndexOf("'");
                posEnd = errorMessage.LastIndexOf("'");

                if (posEnd >= posStart)
                {
                    message = "The Record is Available";//errorMessage.Substring(posStart, (posEnd - posStart + 1)) + " is available";
                    goto ENDLINE;
                }
            }

            //Validation Message for Adding/Updating duplicate value
            posStart = errorMessage.ToLower().IndexOf("cannot delete");

            if (posStart >= 0)
            {
                message = "Cannot Delete";
            }

            posStart = errorMessage.ToLower().IndexOf("Deadlock found");

            if (posStart >= 0)
            {
                result.IsDeadLock = true;
                message = "Other user is trying to save,try to save again.";
            }

        ENDLINE:
            ((ExceptionHandler)result.Exception).Add(e, message);
        }
        #endregion

        #region Dispose
        void IDisposable.Dispose()
        {
            GC.Collect();
        }
        #endregion

        #region Transaction Methods
        public void RollBackTransaction()
        {
            OracleCommand objcmd = new OracleCommand();
            objcmd.Transaction.Rollback();
        }

        public void CommitTransaction()
        {
            OracleCommand objcmd = new OracleCommand();
            objcmd.Transaction.Commit();
        }

        public ResultArgs ExecuteAsScripts(string sSQL)
        {
            ResultArgs result = new ResultArgs();
            try
            {
                connection = OpenConnection();
                //var script = new (connection, sSQL);
                //var resultScript = script.Execute();
                result.Success = true;
                //result.RowsAffected = resultScript;
            }
            catch (Exception e)
            {
                result.Exception = e;
                result.Success = false;
                using (ErrorLog objlog = new ErrorLog())
                {
                    objlog.WriteError("Error Handler", "FetchData(DataValue,string)", sSQL, e.Message);
                }
                CloseConnection();
            }
            finally
            {
                CloseConnection();
            }






            return result;


        #endregion
        }
    }
}
