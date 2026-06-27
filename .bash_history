sudo apt update && sudo apt upgrade -y
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
docker --version
sudo docker run hello-world
sudo apt install docker-compose-plugin -y
sudo apt install docker-compose -y
docker-compose --version
docker compose version
sudo docker run -d -p 80:80 --name techzone-nginx nginx
sudo docker ps
sudo apt install mysql-client -y
mysql -h 172.31.43.24 -u techzone_user -p
SHOW DATABASES;
nc -vz 172.31.43.24  3306
nc -vz 172.31.43.24 3306
mysql -h 172.31.43.24 -u techzone_user -p
mkdir techzone-project
cd techzone-project
mkdir frontend backend
nano docker-compose.yml
sudo docker compose up -d
sudo docker ps
exit
sudo docker ps
sudo docker stop techzone-nginx
sudo docker rm techzone-nginx
cd ~/techzone-project
sudo docker compose up -d
sudo docker ps
exit
cd techzone-project
sudo docker-compose up -d
sudo apt update && sudo apt install docker.io docker-compose -y
sudo docker-compose up -d
sudo docker compose up -d
sudo docker compose down
sudo docker compose up -d
cat << 'EOF' > docker-compose.yml
version: '3.8'

services:
  web:
    image: php:8.0-apache
    container_name: techzone-app-server
    ports:
      - "80:80"
    volumes:
      - ./techzone-frontend:/var/www/html
    restart: always

  db:
    image: mysql:5.7
    container_name: techzone-db
    environment:
      MYSQL_ROOT_PASSWORD: admin
      MYSQL_DATABASE: techzone_db
    ports:
      - "3306:3306"
    volumes:
      - ./database:/docker-entrypoint-initdb.d
    restart: always
EOF

sudo docker compose down
sudo docker compose up -d
sudo docker stop techzone-frontend
sudo docker rm techzone-frontend
sudo docker compose up -d
sudo docker rm -f $(sudo docker ps -aq)
cat << 'EOF' > docker-compose.yml
version: '3.8'

services:
  web:
    image: php:8.0-apache
    container_name: techzone-app-server
    ports:
      - "80:80"
    volumes:
      - ./frontend:/var/www/html
    restart: always

  db:
    image: mysql:5.7
    container_name: techzone-db
    environment:
      MYSQL_ROOT_PASSWORD: admin
      MYSQL_DATABASE: techzone_db
    ports:
      - "3306:3306"
    volumes:
      - ./database:/docker-entrypoint-initdb.d
    restart: always
EOF

sudo docker compose up -d
sudo docker compose down
sudo docker compose up -d
cd ~/techzone-project/frontend
ls
sudo docker ps
exit
sudo docker ps
cd ~/techzone-project/frontend
sudo docker cp . techzone-app-server:/var/www/html/
sudo docker restart techzone-app-server
sudo docker stop techzone-db
sudo docker ps
cd ~/techzone-project/frontend
nano api.php
curl http://localhost/api.php
exit
sudo docker ps
exit
cd ~/techzone-project/frontend
ls
sudo docker cp . techzone-app-server:/var/www/html/
sudo docker restart techzone-app-server
sudo docker exec -it techzone-app-server ls /var/www/html
curl http://localhost
sudo docker restart techzone-app-server
exit
cd ~/techzone-project/frontend
sudo docker cp . techzone-app-server:/var/www/html/
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp . techzone-app-server:/var/www/html/
sudo docker restart techzone-app-server
ls
cd ~/techzone-project/frontend
sudo docker cp . techzone-app-server:/var/www/html/
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
nano api.php
sudo docker cp api.php techzone-app-server:/var/www/html/api.php
sudo docker restart techzone-app-server
curl http://localhost/api.php
cd ~/techzone-project/frontend
sudo docker cp . techzone-app-server:/var/www/html/
sudo docker restart techzone-app-server
exit
cd ~/techzone-project/frontend
nano app.js
cd ~/techzone-project/frontend
techzone-frontend
cd ~/techzone-project/frontend
sudo docker cp . techzone-app-server:/var/www/html/
sudo docker restart techzone-app-server
nano app.js
cd ~/techzone-project/frontend
ls -l
sudo docker exec -it techzone-app-server ls -l /var/www/html
curl http://localhost | head -30
nano index.html
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
head -5 app.js
grep DATA app.js
nano app.js
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker restart techzone-app-server
nano index.html
nano app.js
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker restart techzone-app-server
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker restart techzone-app-server
nano app.js
nano index.html
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker restart techzone-app-server
exit
cd ~/techzone-project/frontend
mkdir -p images
ls images
nano app.js
sudo docker cp . techzone-app-server:/var/www/html/
sudo docker restart techzone-app-server
nano app.js
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker restart techzone-app-server
nano app.js
cd ~/techzone-project/frontend
mkdir -p images
ls images
sudo docker cp . techzone-app-server:/var/www/html/
sudo docker restart techzone-app-server
nano app.js
exit
nano app.js
cd ~/techzone-project/frontend
mkdir -p images
ls images
nano app.js
sudo docker cp . techzone-app-server:/var/www/html/
sudo docker restart techzone-app-server
nano style.css
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
nano style.css
nano app.js
nano index.html
cd ~/techzone-project/frontend
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp api.php techzone-app-server:/var/www/html/api.php
sudo docker restart techzone-app-server
nano app.js
cd ~/techzone-project/frontend
mkdir -p images
ls images
nano app.js
history | tail -n 30
cd cd ~/techzone-project/frontend/
cd frontend
cd cd /techzone-project/frontend/
cd /techzone-project/frontend/
cd ~/techzone-project/frontend/
nano app.js
sudo docker cp /home/ubuntu/techzone-project/frontend/index.html techzone-app-server:/var/www/html/index.html && sudo docker cp /home/ubuntu/techzone-project/frontend/app.js techzone-app-server:/var/www/html/app.js
rm -f .app.js.swp
sudo docker cp /home/ubuntu/techzone-project/frontend/index.html techzone-app-server:/var/www/html/index.html && sudo docker cp /home/ubuntu/techzone-project/frontend/app.js techzone-app-server:/var/www/html/app.js
cd ~/techzone-project/frontend/
rm -f ~/index.html ~/app.js ~/.app.js.swp
sudo docker cp /home/ubuntu/techzone-project/frontend/index.html techzone-app-server:/var/www/html/index.html && sudo docker cp /home/ubuntu/techzone-project/frontend/app.js techzone-app-server:/var/www/html/app.js
sudo docker cp /home/ubuntu/techzone-project/frontend/app.js techzone-app-server:/var/www/html/app.js
ip a
cd ~/techzone-project/frontend
nano index.html
nano style.css
nano app.js
cd ~/techzone-project/frontend
sudo docker cp . techzone-app-server:/var/www/html/
sudo docker restart techzone-app-server
nano registrar_usuario.php
cd ~/techzone-project/frontend
nano app.js
cd ~/techzone-project/frontend
nano registrar_usuario.php
sudo docker cp registrar_usuario.php techzone-app-server:/var/www/html/registrar_usuario.php
sudo docker restart techzone-app-server
nano app.js
curl http://localhost/index.html | head -5
curl http://localhost/registrar_usuario.php
sudo docker exec -it techzone-app-server ls /var/www/html
sudo docker restart techzone-app-server
nano index.html
nano registrar_usuario.php
cd ~/techzone-project/frontend
nano index.html
cd ~/techzone-project/frontend
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp login.php techzone-app-server:/var/www/html/login.php
sudo docker cp registrar_usuario.php techzone-app-server:/var/www/html/registrar_usuario.php
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
nano login.php
nano index.html
nano style.css
nano app.js
cd ~/techzone-project/frontend
sudo docker cp . techzone-app-server:/var/www/html/
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
ls -l
sudo docker exec -it techzone-app-server ls -l /var/www/html
curl http://localhost/login.php
curl http://localhost/index.html | grep auth-modal
nano style.css
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
nano index.html
cd ~/techzone-project/frontend
cp index.html index_backup.html
cp app.js app_backup.js
cp style.css style_backup.css
nano index.html
nano app.js
nano style.css
cd ~/techzone-project/frontend
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp login.php techzone-app-server:/var/www/html/login.php
sudo docker cp registrar_usuario.php techzone-app-server:/var/www/html/registrar_usuario.php
sudo docker restart techzone-app-server
nc -vz 172.31.43.24 3306
sudo docker exec -it techzone-app-server php -m | grep mysqli
curl -X POST http://localhost/registrar_usuario.php -H "Content-Type: application/json" -d '{"nombres":"Prueba","apellidos":"Test","correo":"prueba@test.com","password":"123456","telefono":"999999999","direccion":"Lima"}'
curl -X POST http://localhost/registrar_usuario.php -H "Content-Type: application/json" -d '{"nombres":"Prueba","apellidos":"Test","correo":"prueba@test.com","password":"123456","telefono":"999999999","direccion":"Lima"}'
nc -vz 172.31.43.24 3306
cd ~/techzone-project/frontend
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp login.php techzone-app-server:/var/www/html/login.php
sudo docker cp registrar_usuario.php techzone-app-server:/var/www/html/registrar_usuario.php
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
grep -n "function showRegister" app.js
grep -n "function showLogin" app.js
node -c app.js
sudo docker exec -it techzone-app-server ls /var/www/html
cd ~/techzone-project/frontend
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
cp app.js app_error_backup.js
nano app.js
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
nano app.js
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
curl -X POST http://localhost/registrar_usuario.php -H "Content-Type: application/json" -d '{"nombres":"Prueba","apellidos":"Test","correo":"prueba@test.com","password":"123456","telefono":"999999999","direccion":"Lima"}'
sudo docker exec -it techzone-app-server bash
cd ~/techzone-project/frontend
sudo docker cp login.php techzone-app-server:/var/www/html/login.php
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
nano login.php
cd ~/techzone-project/frontend
nano agregar_producto.php
cd ~/techzone-project/frontend
sudo docker cp registrar_usuario.php techzone-app-server:/var/www/html/registrar_usuario.php
sudo docker restart techzone-app-server
sudo docker cp agregar_producto.php techzone-app-server:/var/www/html/agregar_producto.php
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker restart techzone-app-server
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
curl -X POST http://localhost/registrar_usuario.php -H "Content-Type: application/json" -d '{"nombres":"Prueba","apellidos":"Roles","correo":"roles@test.com","password":"123456","telefono":"999999999","direccion":"Lima","id_rol":1}'
nano login.php
cd ~/techzone-project/frontend
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker restart techzone-app-server
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
nano agregar_producto.php
sudo docker cp agregar_producto.php techzone-app-server:/var/www/html/agregar_producto.php
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp agregar_producto.php techzone-app-server:/var/www/html/agregar_producto.php
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker restart techzone-app-server
curl -X POST http://localhost/agregar_producto.php -F "nombre=Producto Test" -F "descripcion=Prueba" -F "precio=100" -F "stock=10"
curl -X POST http://localhost/agregar_producto.php -F "nombre=Producto Test" -F "descripcion=Prueba" -F "precio=100" -F "stock=10"
cd ~/techzone-project/frontend
nano listar_productos.php
sudo docker cp listar_productos.php techzone-app-server:/var/www/html/listar_productos.php
sudo docker restart techzone-app-server
curl http://localhost/listar_productos.php
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp agregar_producto.php techzone-app-server:/var/www/html/agregar_producto.php
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
nano mis_productos.php
sudo docker cp mis_productos.php techzone-app-server:/var/www/html/mis_productos.php
sudo docker restart techzone-app-server
curl "http://localhost/mis_productos.php?id_vendedor=5"
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
nano eliminar_producto.php
nano editar_producto.php
sudo docker cp eliminar_producto.php techzone-app-server:/var/www/html/eliminar_producto.php
sudo docker cp editar_producto.php techzone-app-server:/var/www/html/editar_producto.php
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
nano procesar_pedido.php
sudo docker cp procesar_pedido.php techzone-app-server:/var/www/html/procesar_pedido.php
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
nano mis_pedidos.php
sudo docker cp mis_pedidos.php techzone-app-server:/var/www/html/mis_pedidos.php
sudo docker restart techzone-app-server
curl "http://localhost/mis_pedidos.php?id_usuario=4"
cd ~/techzone-project/frontend
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp mis_pedidos.php techzone-app-server:/var/www/html/mis_pedidos.php
sudo docker restart techzone-app-server
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
cp index.html index_backup.html
cp app.js app_backup.js
cp style.css style_backup.css
mv index_clean.html index.html
mv app_clean.js app.js
mv style_clean_full.css style.css
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
grep -n "pedidos-modal\|pedidos-box" style.css
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
mv style_clean.css style.css
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker restart techzone-app-server

sudo apt update
sudo restart 3.137.148.4
cd ~/techzone-project/frontend
nano recuperar_password.php
sudo docker cp recuperar_password.php techzone-app-server:/var/www/html/recuperar_password.php
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
nano admin_resumen.php
sudo docker cp admin_resumen.php techzone-app-server:/var/www/html/admin_resumen.php
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp admin_resumen.php techzone-app-server:/var/www/html/admin_resumen.php
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
nano listar_usuarios.php
sudo docker cp listar_usuarios.php techzone-app-server:/var/www/html/listar_usuarios.php
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp listar_usuarios.php techzone-app-server:/var/www/html/listar_usuarios.php
sudo docker restart techzone-app-server
curl http://localhost/listar_usuarios.php
cd ~/techzone-project/frontend
nano listar_inventario.php
sudo docker cp listar_inventario.php techzone-app-server:/var/www/html/listar_inventario.php
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
nano listar_pedidos_admin.php
sudo docker cp listar_pedidos_admin.php techzone-app-server:/var/www/html/listar_pedidos_admin.php
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp listar_inventario.php techzone-app-server:/var/www/html/listar_inventario.php
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
nano detalle_pedido_admin.php
sudo docker cp detalle_pedido_admin.php techzone-app-server:/var/www/html/detalle_pedido_admin.php
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
nano obtener_producto.php
nano producto.html
nano producto.js
sudo docker cp obtener_producto.php techzone-app-server:/var/www/html/obtener_producto.php
sudo docker cp producto.html techzone-app-server:/var/www/html/producto.html
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp obtener_producto.php techzone-app-server:/var/www/html/obtener_producto.php
sudo docker cp producto.html techzone-app-server:/var/www/html/producto.html
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker restart techzone-app-server
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp obtener_producto.php techzone-app-server:/var/www/html/obtener_producto.php
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp producto.html techzone-app-server:/var/www/html/producto.html
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
df -h
sudo docker ps
cd ~
mkdir techzone-social-api
cd techzone-social-api
nano package.json
nano server.js
nano Dockerfile
sudo docker build -t techzone-social-api .
sudo docker run -d --name techzone-social-api -p 3000:3000 techzone-social-api
sudo docker ps
curl http://localhost:3000/
curl http://localhost:3000/comentarios/1
sudo docker ps -a
sudo docker logs techzone-social-api
nc -vz 172.31.43.24 27017
sudo apt install netcat-openbsd -y
nc -vz 172.31.43.24 27017
nc -vz -w 5 172.31.43.24 27017
sudo docker start techzone-social-api
curl http://localhost:3000/
sudo docker logs techzone-social-api --tail 50
nc -vz -w 5 172.31.43.24 27017
curl http://localhost:3000/
curl http://localhost:3000/comentarios/1
cd ~/techzone-project/frontend
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
sudo docker cp producto.html techzone-app-server:/var/www/html/producto.html
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker restart techzone-app-server
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker restart techzone-app-server
curl -X POST http://localhost:3000/comentarios -H "Content-Type: application/json" -d '{"id_producto":1,"usuario":"Diego","comentario":"Comentario de prueba desde curl"}'
curl http://localhost:3000/comentarios/1
cd ~/techzone-project/frontend
cd ~/techzone-social-api
exit
cd ~/techzone-project/frontend
[200~cd ~/techzone-project/frontend
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
cd ~/techzone-project/frontend
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp producto.html techzone-app-server:/var/www/html/producto.html
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp producto.html techzone-app-server:/var/www/html/producto.html
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp producto.html techzone-app-server:/var/www/html/producto.html
cd ~/techzone-social-api
nano server.js
cd ~/techzone-social-api
sudo docker stop techzone-social-api
sudo docker rm techzone-social-api
sudo docker build -t techzone-social-api .
sudo docker run -d --name techzone-social-api -p 3000:3000 techzone-social-api
cd ~/techzone-project/frontend
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
ssh ubuntu@3.137.148.4
cd ~/techzone-social-api
sudo docker cp producto.html techzone-app-server:/var/www/html/producto.html
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-social-api
nano server.js
sudo docker stop techzone-social-api
sudo docker rm techzone-social-api
sudo docker build -t techzone-social-api .
sudo docker run -d --name techzone-social-api -p 3000:3000 techzone-social-api
cd ~/techzone-project/frontend
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
nano productos_relacionados.php
sudo docker cp productos_relacionados.php techzone-app-server:/var/www/html/productos_relacionados.php
sudo docker cp producto.html techzone-app-server:/var/www/html/producto.html
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker cp obtener_producto.php techzone-app-server:/var/www/html/obtener_producto.php
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp listar_productos.php techzone-app-server:/var/www/html/listar_productos.php
sudo docker restart techzone-app-server
curl http://localhost/listar_productos.php
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp agregar_producto.php techzone-app-server:/var/www/html/agregar_producto.php
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp index.html techzone-app-server:/var/www/html/index.html
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp agregar_producto.php techzone-app-server:/var/www/html/agregar_producto.php
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp obtener_producto.php techzone-app-server:/var/www/html/obtener_producto.php
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp producto.js techzone-app-server:/var/www/html/producto.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker cp style.css techzone-app-server:/var/www/html/style.css
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp procesar_pedido.php techzone-app-server:/var/www/html/procesar_pedido.php
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
cd ~/techzone-project/frontend
sudo docker cp procesar_pedido.php techzone-app-server:/var/www/html/procesar_pedido.php
sudo docker cp app.js techzone-app-server:/var/www/html/app.js
sudo docker restart techzone-app-server
