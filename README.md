# Requirements

* Linux Environment
* Java JRE 8
* wget
* unzip
* curl

Installation of Java JRE 8 on Ubuntu

You may have to install OpenJDK instead

* sudo add-apt-repository ppa:webupd8team/java
* sudo apt-get update
* sudo apt-get install oracle-java8-installer

# Installation Instructions


* Clone the Repository
* Run the build.sh
* Navigate to the suitecrm-analytics-server directory
* Configure the install.properties
* Run the setup-suitecrm-analytics.sh script
* Start the server

# Notes

Upload the datasource manifest:

./import-export.sh --restore --url=http://localhost:8080/suitecrmanalytics --username=admin --password=password --file-path=/root/suitecrm-analytics/datasources.zip --overwrite=true --logfile=/temp/logfile.log

H2 Connection for BI Server:

jdbc:h2:../../pentaho-solutions/system/SuiteCRMAnalytics/resources/database/suitecrmanalytics;DB_CLOSE_DELAY=-1;AUTO_SERVER=TRUE;INIT=RUNSCRIPT FROM '../../pentaho-solutions/system/SuiteCRMAnalytics/resources/ddl/suitecrmanalytics.ddl'

NO USERNAME OR PASSWORD!

We need to install the PRS manually as the patches way is causing issues

** SuiteCRM-Analytics Client Tools



** JDBC Driver NOTE!!! Make sure to delete the old MySQL driver in tomcat/lib or we get a shitty error
