{ pkgs, config, ... }:
{
  environment.defaultPackages = with pkgs; [ docker docker-compose ];
  virtualisation.docker = {
    enable = false;

    rootless = {
      enable = true;
      setSocketVariable = true;
    };
  };
  users.users."${config.var.username}".extraGroups = [ "docker" ];
}
