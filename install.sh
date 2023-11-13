#!/bin/bash

INSTALL_DIR="/usr/local/bin"

SCRIPT_PATH="/Users/kostatarasenko/WebstormProjects/gnp/src/generate_new_password.js"

# Make sure script exists
if [ ! -f "$SCRIPT_PATH" ]; then
  echo "Error: Script not found at $SCRIPT_PATH"
  exit 1
fi

sudo mkdir -p "$INSTALL_DIR"

sudo cp "$SCRIPT_PATH" "$INSTALL_DIR"

# Replace bun with node if you want to use node to run the script
echo -e "#!/bin/bash\nbun $INSTALL_DIR/generate_new_password.js \"\$@\"" | sudo tee "$INSTALL_DIR/gnp" > /dev/null

sudo chmod +x "$INSTALL_DIR/gnp"

echo "Global installation 'gnp' successfully completed!"
