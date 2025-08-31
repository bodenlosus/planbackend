{ config, ... }: {
  imports = [ ../../nixos/variables-config.nix ];

  config.var = {
    hostname = "planserver";
    username = "planuser";
    configDirectory = "/home/" + config.var.username
      + "/.config/nixos"; # The path of the nixos configuration directory

    keyboardLayout = "de";

    location = "Berlin";
    timeZone = "Europe/Berlin";
    defaultLocale = "en_US.UTF-8";
    extraLocale = "de_DE.UTF-8";
    autoUpgrade = false;
    autoGarbageCollector = false;
  };
}
