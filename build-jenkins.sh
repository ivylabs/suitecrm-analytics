#!/bin/bash

echo ""
echo " We are about to build SuiteCRM Analytics"
echo ""

WORKING_DIR=$(pwd);



file="./version"

if [ -f "$file" ]
then

    while IFS='=' read -r key value
    do
            key=$(echo $key | tr '.' '_')
            eval ${key}=\${value}
    done < "$file"

        

else
	echo "$file not found."
fi

echo ""
echo " Installing..."
echo ""

if [ ! -d install/installation-files ]; then

	echo " Downloading Pentaho Server Zip"

       	mkdir install/installation-files

	wget --progress=dot:giga https://downloads.sourceforge.net/project/pentaho/Pentaho%208.2/server/pentaho-server-ce-8.2.0.0-342.zip -O install/installation-files/suitecrm-server.zip
	
	# For local testing ONLY
	#wget --progress=dot:giga http://localhost:8000/pentaho-server-ce-8.0.0.0-28.zip -O install/installation-files/suitecrm-server.zip

	# Pentaho 8.2

	#wget --progress=dot:giga http://localhost:8000/pentaho-server-ce-8.2.0.0-342.zip -O install/installation-files/suitecrm-server.zip

fi


echo " Extracting files..."
echo ""

unzip -o install/installation-files/suitecrm-server.zip -d install/installation-files/ | awk 'BEGIN {ORS=" "} {if(NR%100==0)print "."}'

cd ${WORKING_DIR}/install/solution/

zip -r SuiteCRM-Analytics.zip public/ exportManifest.xml schema.xml | awk 'BEGIN {ORS=" "} {if(NR%100==0)print "."}'

cd ${WORKING_DIR}

mkdir suitecrm-analytics-server

mv install/installation-files/pentaho-server/* suitecrm-analytics-server
mv suitecrm-analytics-server/tomcat/webapps/pentaho/ suitecrm-analytics-server/tomcat/webapps/suitecrmanalytics/
#cp -Rf install/mysql-connector-java-5.1.47.jar suitecrm-analytics/tomcat/lib/

cp -Rf install/suitecrm-analytics/* suitecrm-analytics-server/
mv install/solution/SuiteCRM-Analytics.zip suitecrm-analytics-server/pentaho-solutions/system/default-content/

rm -Rf suitecrm-analytics-server/start-pentaho.sh
rm -Rf suitecrm-analytics-server/start-pentaho.bat
rm -Rf suitecrm-analytics-server/stop-pentaho.sh
rm -Rf suitecrm-analytics-server/stop-pentaho.bat
rm -Rf suitecrm-analytics-server/start-pentaho-debug.sh
rm -Rf suitecrm-analytics-server/start-pentaho-debug.bat

echo""
echo""
echo " Packaging the installation (zip) and removing the ready to use application server"
echo""

zip -r suitecrm-analytics-server-${VERSION}.zip suitecrm-analytics-server/ | awk 'BEGIN {ORS=" "} {if(NR%100==0)print "."}'

rm -Rf suitecrm-analytics-server/

echo ""
echo "-------------------------------------------------------------"
echo ""
echo " Build is complete!"
echo ""
echo "-------------------------------------------------------------"		
	


