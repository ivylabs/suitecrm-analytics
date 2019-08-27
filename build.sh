#/bin/sh

echo ""
echo " We are about to build SuiteCRM Analytics"
echo ""

WORKING_DIR=$(pwd);

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


echo " Extracting files.."
echo ""

unzip install/installation-files/suitecrm-server.zip -d install/installation-files/ | awk 'BEGIN {ORS=" "} {if(NR%100==0)print "."}'

cd ${WORKING_DIR}/install/solution/

zip -r SuiteCRM-Analytics.zip public/

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


zip -r suitecrm-analytics-server.zip suitecrm-analytics-server/

rm -Rf suitecrm-analytics-server/


echo ""
read -r -p " Would you like to remove the installation files? This will save disk space. [y/N] " response
if [[ $response =~ ^([yY][eE][sS]|[yY])$ ]]
then
	rm -Rf install/installation-files/
fi

echo ""
echo "-------------------------------------------------------------"
echo ""
echo " Build is complete!"
echo ""
echo "-------------------------------------------------------------"		
	



