# Consultoria-Informatica-2.0
Se trata de implementar una aplicación tipo SPA mediante el uso intensivo de Ajax.

Requisitos técnicos:

-	Carga dinámica de formularios y scripts de dichos formularios
-	Uso de localStorage para cacheo de datos de la BB.DD. : provincias, localidades, etc..
-	Uso de diálogos y datepicker de Jquery UI.
-	Presencia de al menos una llamada ajax de cada tipo de las siguientes:
o	.load
o	$.get
o	$.post
o	$.ajax
o	$.getScript
o	Ajax sin jquery
-	Recuperación/envío de datos con el servidor en las llamadas Ajax en los siguientes formatos:
o	HTML
o	Script javascript
o	JSON
o	XML
o	Envío de datos serializados (tipo p1=v1&p2=v2…)
-	Subida del proyecto finalizado a GitHub

Material para la entrega:
-	Modelo E/R documentado
o	Documento word con información de lo que almacena cada tabla de la BBDD
o	Documento Word o pdf con el diagrama E/R

-	Copia de la base de datos en formato .sql, conteniendo datos de prueba

-	Código fuente de la aplicación

-	Documento word con la descripción de la práctica, en concreto se necesita conocer:

o	4/5 funciones de actualización de datos (alta de cliente, modificación de contrato, realizar reserva, …)
o	4/5 funciones para generación de listados, al menos dos con filtrado de datos mediante formulario.
o	Localización de los usos de Ajax y formatos de envio/recepción de datos.
	Por ejemplo:
•	$.ajax -> altaCasa.js línea 1500
•	XML -> listadoClientes.js línea 234
