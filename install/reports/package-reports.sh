cd source/

for i in */; do 
	cd $i
	zip -r "${i%/}.prpt" .
	mv "${i%/}.prpt" ../../compiled/"${i%/}.prpt"
	cd ../
done

cd ../
