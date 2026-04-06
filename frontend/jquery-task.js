$(document).ready(function () {

    // ===============================
    // 1. SEARCH EVENTS (jQuery)
    // ===============================
    $("#eventSearch").on("keyup", function () {
        let value = $(this).val().toLowerCase();

        $(".event-card").filter(function () {
            $(this).toggle(
                $(this).find(".card-title")
                    .text()
                    .toLowerCase()
                    .includes(value)
            );
        });
    });


    // ===============================
    // 2. VIEW DETAILS BUTTON
    // ===============================
    $(".event-card .btn").click(function (e) {
        e.stopPropagation(); // prevents card click

        let title = $(this)
            .closest(".card")
            .find(".card-title")
            .text();

        let desc = $(this)
            .closest(".card")
            .find(".card-text")
            .text();

        alert("Event: " + title + "\n\nDetails: " + desc);
    });


    // ===============================
    // 3. AUTO-SELECT EVENT
    // ===============================
    $(".event-card").click(function () {
        let title = $(this)
            .find(".card-title")
            .text();

        $("select").val(title);

        $("#registerModal").modal("show");
    });

});