
# Servidor web Nginx
FROM nginx:stable-alpine

# Copia o portfólio para o diretório público
COPY index.html /usr/share/nginx/html/index.html
COPY assets/ /usr/share/nginx/html/assets/
COPY projetos/ /usr/share/nginx/html/projetos/

# Porta utilizada pelo Nginx
EXPOSE 80
