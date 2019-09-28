#/bin/sh

echo ""
echo " We are about to upgrade SuiteCRM Analytics"
echo ""

WORKING_DIR=$(pwd);

cd ../../

echo "Please enter the admin username"
echo ""

read username;

echo ""
echo "Please enter the admin password"

read -s password;
echo ""



resultMessage=$(./import-export.sh --import --url=http://127.0.0.1:8080/suitecrmanalytics --username=$username --password=$password --charset=UTF-8 --path="/" --file-path="updates/1.1/SuiteCRM-Analytics.zip" --overwrite=true --permission=true --retainOwnership=true | tail -1);

successMessage="Import was successful";

if [ "$resultMessage" == "$successMessage" ];
then

	cd $WORKING_DIR

	cp -Rf pentaho-solutions/* ../../pentaho-solutions/

	echo "-------------------------------------------------------------"
	echo ""
	echo " Upgrade is complete!"
	echo ""
	echo "-------------------------------------------------------------"    
else 
	echo "-------------------------------------------------------------"
	echo ""
	echo " Upgrade Failed!"
	echo ""
	echo "-------------------------------------------------------------"    
fi







