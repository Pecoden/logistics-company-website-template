$(function () {

    $("#contactForm input, #contactForm textarea, #contactForm select").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var locationType = $("#location_type").val();
            var formData = {
                name: $("input[name='name']").val(),
                email: $("input[name='email']").val(),
                lastname: $("input[name='lastname']").val(),
                // For two locations, use the *_two fields for departure
                from_address: locationType === "two" ? $("#from_address_two").val() : $("#from_address").val(),
                postcode1: locationType === "two" ? $("#postcode1_two").val() : $("#postcode1").val(),
                from_floor: locationType === "two" ? $("#from_floor_two").val() : $("#from_floor").val(),
                // Always send to_address, postcode, to_floor (may be empty for one location)
                to_address: $("#to_address").val(),
                postcode: $("#postcode").val(),
                to_floor: $("#to_floor").val(),
                time: $("select[name='time']").val(),
                date: $("input[name='date']").val(),
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
