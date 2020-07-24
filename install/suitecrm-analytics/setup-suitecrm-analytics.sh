#/bin/sh

echo ""
echo " We are about to setup SuiteCRM Analytics"
echo " Make sure you have configured the install.properties correctly"
echo ""
echo " *** IMPORTANT! *** Running this setup will discard any previous installations!"
echo ""

WORKING_DIR=$(pwd);

read -r -p " Have you configured install.properties? [y/N] " response
if [[ $response =~ ^([yY][eE][sS]|[yY])$ ]]
then
	echo ""
	echo " Installing..."
	echo ""


	file="./install.properties"

	if [ -f "$file" ]
	then

		while IFS='=' read -r key value
		do
			key=$(echo $key | tr '.' '_')
			eval ${key}=\${value}
		done < "$file"

		#cp -Rf install/suitecrm-data-integration/{.[!.],}* suitecrm-data-integration/configuration

		#sed -i 's|@@SOLUTION_ROOT_DIR@@|'${WORKING_DIR}'|' suitecrm-data-integration/configuration/config
		#sed -i 's|@@JVM_SIZE@@|'${JVM_SIZE}'|' suitecrm-data-integration/configuration/config

		# JNDI Configuration

		sed -i 's|@@SUITECRM_ANALYTICS_HOST@@|'${SUITECRM_ANALYTICS_HOST}'|'  tomcat/webapps/suitecrmanalytics/META-INF/context.xml
		sed -i 's|@@SUITECRM_ANALYTICS_PORT@@|'${SUITECRM_ANALYTICS_PORT}'|'  tomcat/webapps/suitecrmanalytics/META-INF/context.xml
		sed -i 's|@@SUITECRM_ANALYTICS_DATABASE@@|'${SUITECRM_ANALYTICS_DATABASE}'|'  tomcat/webapps/suitecrmanalytics/META-INF/context.xml
		sed -i 's|@@SUITECRM_ANALYTICS_USERNAME@@|'${SUITECRM_ANALYTICS_USERNAME}'|'  tomcat/webapps/suitecrmanalytics/META-INF/context.xml
		sed -i 's|@@SUITECRM_ANALYTICS_PASSWORD@@|'${SUITECRM_ANALYTICS_PASSWORD}'|'  tomcat/webapps/suitecrmanalytics/META-INF/context.xml

		sed -i 's|@@SUITECRM_HOST@@|'${SUITECRM_HOST}'|'  tomcat/webapps/suitecrmanalytics/META-INF/context.xml
                sed -i 's|@@SUITECRM_PORT@@|'${SUITECRM_PORT}'|'  tomcat/webapps/suitecrmanalytics/META-INF/context.xml
                sed -i 's|@@SUITECRM_DATABASE@@|'${SUITECRM_DATABASE}'|'  tomcat/webapps/suitecrmanalytics/META-INF/context.xml
                sed -i 's|@@SUITECRM_USERNAME@@|'${SUITECRM_USERNAME}'|'  tomcat/webapps/suitecrmanalytics/META-INF/context.xml
                sed -i 's|@@SUITECRM_PASSWORD@@|'${SUITECRM_PASSWORD}'|'  tomcat/webapps/suitecrmanalytics/META-INF/context.xml


		sed -i 's|@@SUITECRM_ANALYTICS_WEBAPP_PORT@@|'${SUITECRM_ANALYTICS_WEBAPP_PORT}'|'  tomcat/conf/server.xml
		sed -i 's|@@SUITECRM_ANALYTICS_WEBAPP_PORT@@|'${SUITECRM_ANALYTICS_WEBAPP_PORT}'|'  pentaho-solutions/system/server.properties


		#sed -i 's|@@ETL_ROOT_DIR@@|'${WORKING_DIR}/suitecrm-data-integration/solution'|'  suitecrm-data-integration/configuration/.kettle/kettle.properties

		echo ""
                echo "-------------------------------------------------------------"
                echo ""
                echo " Setup is complete!"
                echo ""
                echo "-------------------------------------------------------------"		

		

	else
		echo "$file not found."
	fi

	
else
	echo " Exiting!"
	echo ""
	exit

fi



