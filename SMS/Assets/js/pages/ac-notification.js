'use strict';
$(document).ready(function () {

    function notify(from, align, icon, type, animIn, animOut, title11, Messageee) {
        debugger;
        var templeates;
        ////////    FAILED CASE
        if (title11 == "Failed !! ") {
            templeates='<div data-growl="container" style="background:black;" class="alert" role="alert">' +
                '<button type="button" class="close" data-growl="dismiss">' +
                '<span aria-hidden="true">&times;</span>' +
                '<span class="sr-only">Close</span>' +
                '</button>' +
                '<span data-growl="icon" class="fas fa-times-circle"></span>' +
                '<span data-growl="title" style="color:orange; font-weight:bold !important;"></span> </br>' +
                '<span data-growl="message" style="white-space: nowrap;"></span>' +
                '<a href="#!" data-growl="url"></a>' +
                '</div>'
        }
            ////////    DELETING CASE
        else if (title11 == "Deleted !! ") {
            templeates = '<div data-growl="container" style="background:black;" class="alert" role="alert">' +
                '<button type="button" class="close" data-growl="dismiss">' +
                '<span aria-hidden="true">&times;</span>' +
                '<span class="sr-only">Close</span>' +
                '</button>' +
                '<span data-growl="icon" class="fas fa-trash"></span>' +
                '<span data-growl="title" style="color:coral; font-weight:bold !important;"></span> </br>' +
                '<span data-growl="message" style="white-space: nowrap;"></span>' +
                '<a href="#!" data-growl="url"></a>' +
                '</div>'
        }
            ////////    SUCCESS CASE
        else {
            templeates='<div data-growl="container" style="background:black;" class="alert" role="alert">' +
                '<button type="button" class="close" data-growl="dismiss">' +
                '<span aria-hidden="true">&times;</span>' +
                '<span class="sr-only">Close</span>' +
                '</button>' +
                '<span data-growl="icon" class="fas fa-check-circle"></span>' +
                '<span data-growl="title" style="color:greenyellow; font-weight:bold !important;"></span> </br>' +
                '<span data-growl="message" style="white-space: nowrap;"></span>' +
                '<a href="#!" data-growl="url"></a>' +
                '</div>'
        }
        title11 = '  ' + title11;
        $.growl({
            icon: icon,
            title: title11,
            message: Messageee,
            url: ''
        }, {
            element: 'body',
            type: type,
            allow_dismiss: true,
            placement: {
                from: from,
                align: align
            },
            offset: {
                x: 30,
                y: 30
            },
            spacing: 10,
            z_index: 999999,
            delay: 2500,
            timer: 1000,
            url_target: '_blank',
            mouse_over: false,
            animate: {
                enter: animIn,
                exit: animOut
            },
            icon_type: 'class',
            template: templeates
        });
    };
    $('.notifications.btn').on('click', function (e) {
        e.preventDefault();
        var nFrom = $(this).attr('data-from');
        var nAlign = $(this).attr('data-align');
        var nIcons = $(this).attr('data-notify-icon');
        var nType = $(this).attr('data-type');
        var nAnimIn = $(this).attr('data-animation-in');
        var nAnimOut = $(this).attr('data-animation-out');
        var title11 = $(this).val();
        var mess = $('#Title').html();
        notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut, title11, mess);
    });
});
