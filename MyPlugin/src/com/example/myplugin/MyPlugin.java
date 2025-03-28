package com.example.myplugin;

import org.bukkit.Bukkit;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.plugin.java.JavaPlugin;

public class MyPlugin extends JavaPlugin {

    @Override
    public void onEnable() {
        // โค้ดที่ทำงานเมื่อปลั๊กอินเปิดใช้งาน
        getLogger().info("MyPlugin has been enabled!");
    }

    @Override
    public void onDisable() {
        // โค้ดที่ทำงานเมื่อปลั๊กอินปิดใช้งาน
        getLogger().info("MyPlugin has been disabled!");
    }

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        if (command.getName().equalsIgnoreCase("randomitem")) {
            if (sender instanceof Player) {
                Player player = (Player) sender;
                String[] items = {
                        "Wooden Pickaxe", "Stone Pickaxe", "Iron Pickaxe", "Diamond Pickaxe", "Netherite Pickaxe",
                        "Wooden Sword", "Stone Sword", "Iron Sword", "Diamond Sword", "Netherite Sword"
                };
                int randomIndex = (int) (Math.random() * items.length);
                String randomItem = items[randomIndex];

                player.sendMessage("You received: " + randomItem);
                Bukkit.broadcastMessage(player.getName() + " received: " + randomItem);
            } else {
                sender.sendMessage("This command can only be used by players!");
            }
            return true;
        }
        return false;
    }
}