module.exports = {
        LOGS: {
            /**
             * @GameLogs Biten oyunların oyun bilgisinin loglanacağı kanal ID'si.
             * @ChatLogs Biten oyunların metin kayıtlarının loglanacağı kanal ID'si.
             */
            GameLogs: true,
            ChatLogs: true
        },
    
        GAME: {
            /**
             * Botun eşleşeceği oyun lobileri, her bir metin kanalı yanındaki ses kanalına ait bir lobi olur.
             */
            Lobbies: [
                {TextChannel: "1146584331838574622", VoiceChannel: "1146584353888026695"}
            ],
    
            /**
             * Bot komutunu kullanabilecek rolleri belirtiniz, burada tanımlanmamış roldeki üyeler sadece "Durum" komutunu kullanabilir.
             * @ADMIN Tüm oyunları yönetebilir, bitirebilir. Her komutta tam izine sahiptir.
             * @MODERATOR Sadece kendi başlattığı oyunu yönetebilir.
             * @BLOCKED Komutlardan engellenen roldür, hiçbir komutu kullanamaz.
             * 
             * @param Guild Belirtilen rolün sunucu ID'si.
             * @param Role Belirtilen rolün ID'si.
             * @param Permission Belirtilen rolün sahip olduğu izin. İzinler hakkıında bilgi için biraz üste bakınız.
             */
    
            Host: [
                {Guild: "1146050688074391592", Role: "1146051405652693024", Permission: "ADMIN"},
                {Guild: "", Role: "", Permission: "MODERATOR"},
                {Guild: "", Role: "", Permission: "BLOCKED"},
    
            ],        
        }
    }

    return;
    let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let System = Schema({

    WARNID: {
        type: Number,
        default: 0
    },
guildID: { type: String, default: "" },
ServerTag: { type: String, default: "" },
ServerUntag: { type: String, default: "" },

ServerUnregister: { type: Array, default: [] },
ServerWoman: { type: Array, default: [] },
ServerMan: { type: Array, default: [] },
ServerSuspect: { type: String, default: "" },
ServerBooster: { type: String, default: "" },
ServerTeam:  { type: String, default: "" },

ServerJailed: { type: String, default: "" },
ServerVoiceMuted: { type: String, default: "" },
ServerChatMuted: { type: String, default: "" },
ServerAdsJail: { type: String, default: "" },
ServerUnderWorld: { type: String, default: "" },


ServerPowerfulAll: { type: Array, default: [] },
ServerVoiceMutePowerful: { type: Array, default: [] },
ServerChatMutePowerful: { type: Array, default: [] },
ServerAdsJailPowerful: { type: Array, default: [] },
ServerJailPowerful: { type: Array, default: [] },
ServerUnderworldPowerful: { type: Array, default: [] },
ServerRegisterPowerful: { type: Array, default: [] },
ServerBotCommand: { type: String, default: "" },


ServerPowerfulOne: { type: Array, default: [] },
ServerPowerfulTwo: { type: Array, default: [] },
ServerPowerfulThree: { type: Array, default: [] },
ServerPowerfulOneName: { type: String, default: "" },
ServerPowerfulTwoName: { type: String, default: "" },
ServerPowerfulThreeName: { type: String, default: "" },


ServerFounderRoles: { type: Array, default: [] },
ServerCoOwnerRole: { type: Array, default: [] },
ServerOwmnerRole: { type: Array, default: [] },
ServerResponsibleRoles: { type: Array, default: [] },

statRozetOne: { type: String, default: "" },
statRozetTwo: { type: String, default: "" },
statRozetThree: { type: String, default: "" },
statRozetFour: { type: String, default: "" },
statRozetFive: { type: String, default: "" },

ServerCoinChats: { type: Array, default: [] },
ServerİzinliCommands: { type: Array, default: [] },
ServerRegisterChat: { type: String, default: "" },
ServerInvıteChat: { type: String, default: "" },
ServerGenelChat: { type: String, default: "" },
ServerCMuteChat: { type: String, default: "" },
ServerVMuteChat: { type: String, default: "" },
ServerUnderworldChat: { type: String, default: "" },
ServerAdsChat: { type: String, default: "" },
ServerJailChat: { type: String, default: "" },


ServerMinYas: { type: Number, default: 14 },

});

module.exports = mongoose.model("SystemServer", System)