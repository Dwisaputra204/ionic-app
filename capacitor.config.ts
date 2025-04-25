import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.demo.pg.react",
  appName: "Cycle Counter",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
