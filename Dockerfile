FROM po1234263/columnstore_ng8080:4

WORKDIR /usr/src/app/cpimport

RUN mkdir -p /usr/src/app/cpimport/

RUN dnf module install -y nodejs:12

RUN dnf install -y npm

COPY . /usr/src/app/cpimport

RUN npm install

ENTRYPOINT [ "node", "app.js" ]

