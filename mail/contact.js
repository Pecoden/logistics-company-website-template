$(function () {

    $("#contactForm input, #contactForm textarea, #contactForm select").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var formData = {
                name: $("input[name='name']").val(),
                email: $("input[name='email']").val(),
                lastname: $("input[name='lastname']").val(),
                from_address: $("input[name='from_address']").val(),
                postcode: $("input[name='postcode']").val(),
                from_floor: $("select[name='from_floor']").val(),
                to_address: $("input[name='to_address']").val(),
                to_floor: $("select[name='to_floor']").val(),
                time: $("select[name='time']").val(),
                date: $("input[name='date']").val(),
                lift_type: $("select[name='lift_type']").val(),
                move_floor: $("select[name='move_floor']").val(),
                move_hour: $("select[name='move_hour']").val(),
                move_price: $("select[name='move_price']").val(),
                phone: $("input[name='phone']").val(),
                message: $("textarea[name='message']").val()
            };

            $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            $.ajax({
                url: "mail/contact.php",
                type: "POST",
                data: formData,
                cache: false,
                success: function (response) {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#success > .alert-success')
                            .append("<strong>Uw bericht is succesvol verzonden. </strong>");
                    $('#success > .alert-success')
                            .append('</div>');
                    $('#contactForm').trigger("reset");
                },
                error: function () {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Sorry, het lijkt erop dat onze mailserver niet reageert. Probeer het later opnieuw!"));
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});
