# Requirements

* Linux Environment
* OpenJDK 8 JRE
* wget
* unzip
* zip

# Install Java

* sudo apt-get update
* sudo apt-get install openjdk-8-jre

# Install MySQL

* https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04

# Build Instructions


* Clone the Repository
* Run the build.sh

# Server Setup Instructions

* Unzip suitecrm-analytics-server.zip
* Change Dirctory to suitecrm-analytics-server/
* Edit the install.properties
* Execute setup-suitecrm-analytics.sh

# Start / Stop SuiteCRM Analytics

* ./start-suitecrm-analytics.sh
* ./stop-suitecrm-analytics.sh

# Notes

H2 Connection for BI Server:

jdbc:h2:../../pentaho-solutions/system/SuiteCRMAnalytics/resources/database/suitecrmanalytics;DB_CLOSE_DELAY=-1;AUTO_SERVER=TRUE;INIT=RUNSCRIPT FROM '../../pentaho-solutions/system/SuiteCRMAnalytics/resources/ddl/suitecrmanalytics.ddl'

NO USERNAME OR PASSWORD!





