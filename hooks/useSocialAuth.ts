import { useSSO } from "@clerk/expo";
import * as Linking from "expo-linking";
import { useState } from "react";
import { Alert } from "react-native";

const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (
    strategy: "oauth_google" | "oauth_github" | "oauth_apple"
  ) => {
    if (loadingStrategy) return;
    setLoadingStrategy(strategy);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: Linking.createURL("/"),
      });

      if (!createdSessionId || !setActive) {
        Alert.alert("Authentication Failed", "Unable to complete social authentication. Please try again.");
        return;
      }

      await setActive({ session: createdSessionId });

    } catch (error) {
      console.log("Error in social authentication:", error);
      Alert.alert("Error", "Failed to sign in. Please try again.");
    } finally {
      setLoadingStrategy(null);
    }
  };

  return { handleSocialAuth, loadingStrategy };
};

export default useSocialAuth;