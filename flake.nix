{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/release-23.11";
    utils.url = "github:numtide/flake-utils";
  };
  outputs = { self, nixpkgs, utils, ... }@inputs:
    utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          config.allowUnfree = true;
          inherit system;
        };
      in rec {
        devShells.default = pkgs.mkShell rec {
          packages = with pkgs; [ nodejs_21 ];
          shellHook = ''
            alias p=pnpm
          '';
        };
      });
}
