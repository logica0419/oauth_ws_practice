package config

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	ClientID string `json:"client_id"`
}

func GetConfig() (*Config, error) {
	viper.SetDefault("Client_ID", "")

	viper.AutomaticEnv()

	viper.AddConfigPath(".")
	viper.SetConfigName("config")
	viper.SetConfigType("json")
	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			log.Print("Unable to find config.json, default settings or environmental variables are to be used.")
		} else {
			return nil, fmt.Errorf("Error: failed to load config.json - %s ", err)
		}
	}

	var c *Config

	err := viper.Unmarshal(&c)
	if err != nil {
		return nil, fmt.Errorf("Error: failed to parse configs - %s ", err)
	}

	return c, nil
}
