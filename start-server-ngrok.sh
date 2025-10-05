#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting Echo Server with ngrok...${NC}\n"

# Start the server in the background
cd server
echo -e "${GREEN}Starting Express server on port 3000...${NC}"
node index.js &
SERVER_PID=$!

# Wait for server to start
sleep 2

# Start ngrok
echo -e "${GREEN}Starting ngrok tunnel...${NC}\n"
ngrok http 3000 &
NGROK_PID=$!

# Trap to kill both processes on exit
trap "echo -e '\n${YELLOW}Shutting down...${NC}'; kill $SERVER_PID $NGROK_PID 2>/dev/null; exit" INT TERM

echo -e "${BLUE}============================================${NC}"
echo -e "${GREEN}Server is running!${NC}"
echo -e "${BLUE}============================================${NC}"
echo -e "Local:  http://localhost:3000"
echo -e "ngrok:  Check the ngrok URL above ☝️"
echo -e "${YELLOW}Press Ctrl+C to stop both server and ngrok${NC}\n"

# Wait for both processes
wait
