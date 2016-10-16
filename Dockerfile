FROM node:4-onbuild
RUN npm run apidoc
EXPOSE 8080