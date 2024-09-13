Caddy file path: /etc/caddy/Caddyfile

Access caddy file: sudo nano /etc/caddy/Caddyfile


html template:

<!DOCTYPE html>
<html lang='en'>
  <head>
    <title>Chord Generator</title>
    <meta charset='UTF-8'/>
    <link rel='stylesheet' href='styles.css'/>
  </head>
  <body>
      
  </body>
</html>


also, i had to disable automatic shutdown. i did it by commenting out the line when i did the command
sudo nano /etc/cron.d/c9-automatic-shutdown
so to change it back just remove the "#" at the beginning of the line.

update: i just turned it back on, so if you want to disable again, just put the # back at the beginning of the line.