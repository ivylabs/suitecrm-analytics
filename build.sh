#/bin/sh

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


echo " Extracting files.."
echo ""

unzip install/installation-files/suitecrm-server.zip -d install/installation-files/ | awk 'BEGIN {ORS=" "} {if(NR%100==0)print "."}'

#remove original mysql driver
rm -Rf install/installation-files/pentaho-server/tomcat/lib/mysql-connector-java-5.1.17.jar

# Create the server folder
mkdir suitecrm-analytics-server

# Move the vanilla pentahpo server files
mv install/installation-files/pentaho-server/* suitecrm-analytics-server
# Rename the vanilla pentaho server webapp
mv suitecrm-analytics-server/tomcat/webapps/pentaho/ suitecrm-analytics-server/tomcat/webapps/suitecrmanalytics/

# Copy the SuiteCRM Solution files
cp -Rf install/solution/ suitecrm-analytics-server/
# Copy the SuiteCRM Server files
cp -Rf install/suitecrm-analytics/* suitecrm-analytics-server/




rm -Rf suitecrm-analytics-server/start-pentaho.sh
rm -Rf suitecrm-analytics-server/start-pentaho.bat
rm -Rf suitecrm-analytics-server/stop-pentaho.sh
rm -Rf suitecrm-analytics-server/stop-pentaho.bat
rm -Rf suitecrm-analytics-server/start-pentaho-debug.sh
rm -Rf suitecrm-analytics-server/start-pentaho-debug.bat

sed -i 's|@@VERSION@@|'${VERSION}'|' suitecrm-analytics-server/tomcat/webapps/suitecrmanalytics/mantle/home/content/welcome/index.html
sed -i 's|@@VERSION@@|'${VERSION}'|' suitecrm-analytics-server/pentaho-solutions/system/IvyUI/resources/styles/ivyui.html


echo ""
read -r -p " Would you like to package the installation? This will create a zip file and remove the ready to use application server. [y/N] " response
if [[ $response =~ ^([yY][eE][sS]|[yY])$ ]]
then
        zip -r suitecrm-analytics-server-${VERSION}.zip suitecrm-analytics-server/

	rm -Rf suitecrm-analytics-server/

fi




echo ""
read -r -p " Would you like to remove the installation files? This will delete the downloaded files and save disk space. [y/N] " response
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
	



