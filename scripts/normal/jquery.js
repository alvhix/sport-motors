$(document).ready(function () {
    $("#insercion_marca").ready(function () {
        $.ajax({
            url: "json/models-json.json",
            method: "GET",
            dataType: "json",
            success: function (result) {
                $.each(result, function (i) {
                    var marca = result[i].name;
                    $("#insercion_marca").append("<option value='" + marca + "'>" + marca + "</option>");
                });
            }
        });
    });

    $("#insercion_marca").change(function () {
        $.ajax({
            url: "json/models-json.json",
            method: "GET",
            dataType: "json",
            success: function (result) {
                var selected = $("#insercion_marca").val();
                $("#insercion_modelo").empty();
                $("#insercion_modelo").append("<option value='*'>Introduce el modelo</option>");
                $.each(result, function (i) {
                    if (result[i].name === selected) {
                        $.each(result[i].models, function (j) {
                            var modelo = result[i].models[j].name;
                            $("#insercion_modelo").append("<option value='" + modelo + "'>" + modelo + "</option>");
                        });
                    }
                });
            }
        });
    });

    $("#busqueda_marca").ready(function () {
        $.ajax({
            url: "json/models-json.json",
            method: "GET",
            dataType: "json",
            success: function (result) {
                $.each(result, function (i) {
                    var marca = result[i].name;
                    $("#busqueda_marca").append("<option value='" + marca + "'>" + marca + "</option>");
                });
            }
        });
    });

    $("#busqueda_marca").change(function () {
        $.ajax({
            url: "json/models-json.json",
            method: "GET",
            dataType: "json",
            success: function (result) {
                var selected = $("#busqueda_marca").val();
                $("#busqueda_modelo").empty();
                $("#busqueda_modelo").append("<option value='*'>Introduce el modelo (opcional)</option>");
                $.each(result, function (i) {
                    if (result[i].name === selected) {
                        $.each(result[i].models, function (j) {
                            var modelo = result[i].models[j].name;
                            $("#busqueda_modelo").append("<option value='" + modelo + "'>" + modelo + "</option>");
                        });
                    }
                });
            }
        });
    });

    $("#tabla-coche").on("click", ".coche", function () {
        var id = this.dataset.id;
        $("#mostrarCoche").modal('show');

        $.ajax({
            url: "includes/obtener_coche.php",
            data: { id: id },
            method: "POST",
            success: function (result) {
                var arr = JSON.parse(result);
                $("#mostrarCocheBody").empty();
                $("#mostrarCocheBody").append("<p>ID: " + arr.id + "</p>");
                $("#mostrarCocheBody").append("<p>Marca: " + arr.marca + "</p>");
                $("#mostrarCocheBody").append("<p>Modelo: " + arr.modelo + "</p>");
                $("#mostrarCocheBody").append("<p>Color: " + arr.color + "</p>");
                $("#mostrarCocheBody").append("<p>Año: " + arr.año + "</p>");
                $("#mostrarCocheBody").append("<p>Potencia: " + arr.potencia + "cv" + "</p>");
                $("#mostrarCocheBody").append("<p>Combustible: " + arr.combustible + "</p>");
                $("#mostrarCocheBody").append("<p>Kilometraje: " + arr.kilometraje + "km" + "</p>");
                $("#mostrarCocheBody").append("<p>Precio: " + arr.precio + "€" + "</p>");
            }
        });
    });
});