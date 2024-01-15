{ lib, mkPnpmPackage, vips, ... }:

mkPnpmPackage {
  name = "yb-fetch";
  src = ./.;

  # needed by sharp
  extraBuildInputs = [ vips ];
  installInPlace = true;
  meta = with lib; {
    description = "My TypeScript library";
    homepage = "https://example.com";
    license = licenses.mit;
    platforms = with platforms; linux ++ darwin;
    maintainers = [ maintainers.xdhampus ];
  };
}