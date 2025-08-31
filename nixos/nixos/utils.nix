{ pkgs, config, ... }:
let
  hostname = config.var.hostname;
  keyboardLayout = config.var.keyboardLayout;
in
{

  networking.hostName = hostname;

  console.keyMap = keyboardLayout;
  console = {
    earlySetup = true;
  };

  environment.variables = {
    XDG_DATA_HOME = "$HOME/.local/share";
    PASSWORD_STORE_DIR = "$HOME/.local/share/password-store";
    EDITOR = "hx";
    TERMINAL = "kitty";
  };

  # Faster rebuilding
  documentation = {
    enable = true;
    doc.enable = false;
    man.enable = true;
    dev.enable = false;
    info.enable = false;
    nixos.enable = false;
  };

  environment.systemPackages = with pkgs; [
    wget
    git
    curl
  ];

  services.logind.extraConfig = ''
    # don’t shutdown when power button is short-pressed
    HandlePowerKey=ignore
  '';
}
