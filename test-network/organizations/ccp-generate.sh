#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $5)
    local CP=$(one_line_pem $6)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${P1PORT}/$3/" \
        -e "s/\${CAPORT}/$4/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.json
}

function yaml_ccp {
    local PP=$(one_line_pem $5)
    local CP=$(one_line_pem $6)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${P1PORT}/$3/" \
        -e "s/\${CAPORT}/$4/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.yaml | sed -e $'s/\\\\n/\\\n          /g'
}

ORG=manufacturer
P0PORT=7051
P1PORT=8051
CAPORT=7054
PEERPEM=organizations/peerOrganizations/manufacturer.pharma-network.com/tlsca/tlsca.manufacturer.pharma-network.com-cert.pem
CAPEM=organizations/peerOrganizations/manufacturer.pharma-network.com/ca/ca.manufacturer.pharma-network.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/manufacturer.pharma-network.com/connection-manufacturer.json
echo "$(yaml_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/manufacturer.pharma-network.com/connection-manufacturer.yaml

ORG=distributor
P0PORT=9051
P1PORT=10051
CAPORT=8054
PEERPEM=organizations/peerOrganizations/distributor.pharma-network.com/tlsca/tlsca.distributor.pharma-network.com-cert.pem
CAPEM=organizations/peerOrganizations/distributor.pharma-network.com/ca/ca.distributor.pharma-network.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/distributor.pharma-network.com/connection-distributor.json
echo "$(yaml_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/distributor.pharma-network.com/connection-distributor.yaml


ORG=retailer
P0PORT=11051
P1PORT=12051
CAPORT=9054
PEERPEM=organizations/peerOrganizations/retailer.pharma-network.com/tlsca/tlsca.retailer.pharma-network.com-cert.pem
CAPEM=organizations/peerOrganizations/retailer.pharma-network.com/ca/ca.retailer.pharma-network.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/retailer.pharma-network.com/connection-retailer.json
echo "$(yaml_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/retailer.pharma-network.com/connection-retailer.yaml


ORG=transporter
P0PORT=13051
P1PORT=14051
CAPORT=6054
PEERPEM=organizations/peerOrganizations/transporter.pharma-network.com/tlsca/tlsca.transporter.pharma-network.com-cert.pem
CAPEM=organizations/peerOrganizations/transporter.pharma-network.com/ca/ca.transporter.pharma-network.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/transporter.pharma-network.com/connection-transporter.json
echo "$(yaml_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/transporter.pharma-network.com/connection-transporter.yaml


ORG=consumer
P0PORT=15051
P1PORT=16051
CAPORT=5054
PEERPEM=organizations/peerOrganizations/consumer.pharma-network.com/tlsca/tlsca.consumer.pharma-network.com-cert.pem
CAPEM=organizations/peerOrganizations/consumer.pharma-network.com/ca/ca.consumer.pharma-network.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/consumer.pharma-network.com/connection-consumer.json
echo "$(yaml_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/consumer.pharma-network.com/connection-consumer.yaml
