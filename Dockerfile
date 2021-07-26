FROM po1234263/columnstore_ng8080:4

RUN mkdir -p /usr/src/app/cpimport/

RUN dnf module install -y nodejs:12

RUN dnf install -y npm

COPY . /usr/src/app/cpimport

RUN cd /usr/src/app/cpimport/ && npm install



# RUN npm install

# ENTRYPOINT ["tail"]

# CMD ["-f","/dev/null"]
