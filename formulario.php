<?php
session_start();
?>
<!DOCTYPE html>
<html lang=es>
<head>
<meta charset=UTF-8>
<meta name=viewport content="width=device-width,initial-scale=1">
<meta http-equiv=X-UA-Compatible content="ie=edge">
<title>Sport Motors · Formulario</title>
<link rel=stylesheet href=https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css integrity=sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T crossorigin=anonymous>
<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&display=swap" rel=stylesheet>
<link rel=stylesheet href=styles/min/animate.min.css>
<link rel=stylesheet href=styles/min/style.min.css>
<link rel=stylesheet href=styles/min/queries.min.css>
<link rel=apple-touch-icon sizes=57x57 href=favicons/apple-icon-57x57.png>
<link rel=apple-touch-icon sizes=60x60 href=favicons/apple-icon-60x60.png>
<link rel=apple-touch-icon sizes=72x72 href=favicons/apple-icon-72x72.png>
<link rel=apple-touch-icon sizes=76x76 href=favicons/apple-icon-76x76.png>
<link rel=apple-touch-icon sizes=114x114 href=favicons/apple-icon-114x114.png>
<link rel=apple-touch-icon sizes=120x120 href=favicons/apple-icon-120x120.png>
<link rel=apple-touch-icon sizes=144x144 href=favicons/apple-icon-144x144.png>
<link rel=apple-touch-icon sizes=152x152 href=favicons/apple-icon-152x152.png>
<link rel=apple-touch-icon sizes=180x180 href=favicons/apple-icon-180x180.png>
<link rel=icon type=image/png sizes=192x192 href=favicons/android-icon-192x192.png>
<link rel=icon type=image/png sizes=32x32 href=favicons/favicon-32x32.png>
<link rel=icon type=image/png sizes=96x96 href=favicons/favicon-96x96.png>
<link rel=icon type=image/png sizes=16x16 href=favicons/favicon-16x16.png>
<link rel=manifest href=favicons/manifest.json>
<meta name=msapplication-TileColor content=#ffffff>
<meta name=msapplication-TileImage content=favicons/ms-icon-144x144.png>
<meta name=theme-color content=#ffffff>
</head>
<body>
<header class="container mt-2">
<div class=header>
<div class=row>
<div class=col>
<div class="jumbotron mb-0 header__bg-image">
<img src=images/min/logo-min.png alt="Logo Sport Motors" class=header__logo id=logo>
<h1 class="text-light header__heading" id=heading>SPORT MOTORS</h1>
</div>
</div>
</div>
<nav class="row navigation">
<div class=col>
<ul class="nav nav-justify justify-content-center bg-light">
<li class="nav-item navigation__item">
<a class="nav-link active navigation__link" href=index.html>Inicio</a>
</li>
<li class="nav-item navigation__item">
<a class="nav-link navigation__link navigation__link--active" href=formulario.php>Inserción</a>
</li>
<li class="nav-item navigation__item">
<a class="nav-link navigation__link" href=visualizacion.html>Visualización</a>
</li>
<li class="nav-item navigation__item">
<a class="nav-link navigation__link" href=busqueda.html>Búsqueda</a>
</li>
</ul>
</div>
</nav>
</div>
</header>
<article class="container main-container">
<div class="main-container__form my-4 p-3 bg-light rounded animated fadeIn main-container--box-shadow">
<section class=row>
<div class=col>
<h2 class=text-center>Inserción de coches</h2>
<div class=msg id=formulario_mensajes>
<?php
if (isset($_SESSION['exito'])) {
if ($_SESSION['exito']) {
echo "<div class='msg__success'>Coche insertado con éxito</div>";
} else {
echo "<div class='msg__failure'>Rellena todos los campos</div>";
}
session_destroy();
}
?>
</div>
<form action=includes/guardar.inc.php method=POST name=formulario-coche id=formulario-coche>
<div class=form-group>
<label class=font-weight-bold for=insercion_marca>Marca</label>
<select name=marca id=insercion_marca class=form-control>
<option value=*>Introduce la marca</option>
</select>
</div>
<div class=form-group>
<label class=font-weight-bold for=insercion_modelo>Modelo</label>
<select name=modelo id=insercion_modelo class=form-control>
<option value=*>Introduce el modelo</option>
</select>
</div>
<div class=form-group>
<label class=font-weight-bold for=color>Color</label>
<select name=color id=color class=form-control>
<option value=Amarillo>Amarillo</option>
<option value=Azul>Azul</option>
<option value=Beige>Beige</option>
<option value=Blanco>Blanco</option>
<option value=Granate>Granate</option>
<option value=Gris/plata>Gris/plata</option>
<option value=Marrón>Marrón</option>
<option value=Naranja>Naranja</option>
<option value=Negro>Negro</option>
<option value=Rojo>Rojo</option>
<option value=Rosa>Rosa</option>
<option value=Verde>Verde</option>
<option value=Violeta/lila>Violeta/lila</option>
</select>
</div>
<div class=form-group>
<label class=font-weight-bold for=año>Año</label>
<input type=number name=año id=año class=form-control min=1900 max=2099 step=1 value=2019 required>
<small class="form-text text-muted">El año de matriculación del vehículo</small>
</div>
<div class=form-group>
<label class=font-weight-bold for=potencia>Potencia</label>
<input type=number name=potencia id=potencia class=form-control required>
<small class="form-text text-muted">La potencia en CV del coche</small>
</div>
<div class=form-group>
<label class=font-weight-bold>Combustible</label><br>
<div class="form-check form__radio-item">
<input class=form-check-input type=radio name=combustible id=gasolina value=Gasolina checked>
<label class=form-check-label for=gasolina>Gasolina</label>
</div>
<div class="form-check form__radio-item">
<input class=form-check-input type=radio name=combustible id=diésel value=Diésel>
<label class=form-check-label for=diésel>Diésel</label>
</div>
<div class="form-check form__radio-item">
<input class=form-check-input type=radio name=combustible id=híbrido value=Híbrido>
<label class=form-check-label for=híbrido>Híbrido</label>
</div>
<div class="form-check form__radio-item">
<input class=form-check-input type=radio name=combustible id=eléctrico value=Eléctrico>
<label class=form-check-label for=eléctrico>Eléctrico</label>
</div>
</div>
<div class=form-group>
<label class=font-weight-bold for=kilometraje>Kilometraje</label>
<input type=number name=kilometraje id=kilometraje class=form-control required>
<small class="form-text text-muted">El kilometraje actual del coche</small>
</div>
<div class=form-group>
<label class=font-weight-bold for=precio>Precio</label>
<input type=number name=precio id=precio class=form-control required>
<small class="form-text text-muted">El precio en euros (€)</small>
</div>
<div class=text-center>
<input type=submit value=Insertar class="btn btn-secondary">
</div>
</form>
</div>
<div class="lateral-container m-3 p-3 align-self-start rounded animated fadeInUp">
<div class=col>
<h4>Ahora hay: </h4>
<div class="lateral-container__links my-4">
<div class=text-center id=numero-vehiculos></div>
</div>
<div class="lateral-container__links my-3 text-center">
<a href=#null onclick=borrarTodo()>Vaciar stock</a>
</div>
</div>
</div>
</section>
</div>
</article>
<footer class=container-fluid>
<div class=row>
<div class="col-md mt-3 p-0">
<div class="footer bg-light p-4 text-center">
<span class=footer__info-concesionario id=info-concesionario></span>
<div class=footer__credits>
&copy; <span id=year></span> | Hecho por <a class=footer__link href=https://github.com/Alvhix>@Alvhix</a>
</div>
</div>
</div>
</div>
</footer>
<script src=https://code.jquery.com/jquery-3.3.1.slim.min.js integrity=sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo crossorigin=anonymous></script>
<script src=https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js></script>
<script src=https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js integrity=sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1 crossorigin=anonymous></script>
<script src=https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js integrity=sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM crossorigin=anonymous></script>
<script src=scripts/min/script.min.js onload=contarVehiculos()></script>
<script src=scripts/min/jquery.min.js></script>
</body>
</html>