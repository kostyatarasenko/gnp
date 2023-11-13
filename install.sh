#!/bin/bash

INSTALL_DIR="/usr/local/bin"

SCRIPT_PATH="/Users/kostatarasenko/WebstormProjects/gnp/generate_new_password.py"

sudo mkdir -p "$INSTALL_DIR"

sudo cp "$SCRIPT_PATH" "$INSTALL_DIR"

echo -e "#!/bin/bash\npython $INSTALL_DIR/generate_new_password.py \"\$@\"" | sudo tee "$INSTALL_DIR/gnp" > /dev/null

sudo chmod +x "$INSTALL_DIR/gnp"

echo "Global installation 'gnp' successfully completed!"
