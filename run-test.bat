@echo off
echo Starting Spring Boot Application...
mvn spring-boot:run > output.txt 2>&1
type output.txt
