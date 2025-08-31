{
  description = "A Nix-flake-based Rust development environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
      in
      {
        # packages.default = pkgs.callPackage ./. {};
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            sqruff
            postgresql
            openssl
            openssl_3
            pkg-config
            docker
            docker-compose
            docker-compose-language-service
            docker-buildx
            nodejs-slim
            typescript
          ];

          env = {
          };
        };
      }
    );
}
