#/bin/sh

WORKING_DIR=$(pwd);

buildfile="./build.properties"

if [ -f "$buildfile" ]
then

    while IFS='=' read -r key value
    do
            key=$(echo $key | tr '.' '_')
            eval ${key}=\${value}
    done < "$buildfile"



else
        echo "$buildfile not found."
fi

versionfile="./version"

if [ -f "$versionfile" ]
then

    while IFS='=' read -r key value
    do
            key=$(echo $key | tr '.' '_')
            eval ${key}=\${value}
    done < "$versionfile"



else
        echo "$versionfile not found."
fi

rm -Rf install/suitecrm-analytics/documentation/*.pdf

wget https://docs.google.com/document/${SUITECRM_ANALYTICS_INSTALLATION}/export?format=pdf -O install/suitecrm-analytics/documentation/suitecrm-analytics-installation-${VERSION}.pdf
wget https://docs.google.com/document/${SUITECRM_ANALYTICS_GETTING_STARTED}/export?format=pdf -O install/suitecrm-analytics/documentation/suitecrm-analytics-getting-started-${VERSION}.pdf
wget https://docs.google.com/document/${REPORT_DESIGNER_INSTALLATION}/export?format=pdf -O install/suitecrm-analytics/documentation/report-designer-installation.pdf

rm -Rf install/suitecrm-analytics/tomcat/webapps/suitecrmanalytics/*.pdf
cp -Rf install/suitecrm-analytics/documentation/suitecrm-analytics-getting-started-${VERSION}.pdf install/suitecrm-analytics/tomcat/webapps/suitecrmanalytics/suitecrm-analytics-getting-started-${VERSION}.pdf
