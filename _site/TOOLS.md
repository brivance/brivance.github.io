Caddy file path: /etc/caddy/Caddyfile

Access caddy file: sudo nano /etc/caddy/Caddyfile

html template with bootstrap:

<!DOCTYPE html>
<html lang='en'>
  <head>
    <title>Title Page</title>
    <meta charset='UTF-8'/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel='stylesheet' href='styles.css'/>
  </head>
  <body>
  
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="script.js"></script>
      
  </body>
  
</html>

also, i had to disable automatic shutdown. i did it by commenting out the line when i did the command
sudo nano /etc/cron.d/c9-automatic-shutdown
so to change it back just remove the "#" at the beginning of the line.

update: i just turned it back on, so if you want to disable again, just put the # back at the beginning of the line.
