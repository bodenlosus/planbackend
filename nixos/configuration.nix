{ config, ... }: {
  imports = [
    ./nixos/auto-upgrade.nix
    ./nixos/home-manager.nix
    ./nixos/network-manager.nix
    ./nixos/nix.nix
    ./nixos/systemd-boot.nix
    ./nixos/timezone.nix
    ./nixos/users.nix
    ./nixos/utils.nix
    ./nixos/ssh.nix
    ./nixos/variables-config.nix
    ./hardware-configuration.nix
    ./variables.nix
  ];

  nix.settings = {
    substituters = [ "https://hyprland.cachix.org" ];
    trusted-public-keys = [ "hyprland.cachix.org-1:a7pgxzMz7+chwVL3/pzj6jIBMioiJM7ypFP8PwtkuGc=" ];
  };

  home-manager.users."${config.var.username}" = import ./home.nix;
  home-manager.backupFileExtension = "backup";
  # Don't touch this
  system.stateVersion = "25.05";
}
