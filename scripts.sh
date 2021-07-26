whoami
ipconfig
mariadb -q -e 'select * from t2 where b = "TEST";' -N test | cpimport -s '\t' test t1