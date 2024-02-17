package darth.linkedhu.entity;

import com.google.gson.annotations.SerializedName;
import darth.linkedhu.enums.LogType;
import darth.linkedhu.service.LoggerService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ExecutionException;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLog {

    @SerializedName("email")
    private String email;

    @SerializedName("log")
    private String log;

    public void setLog ( UserLog userLog, String log , LogType logType) throws ExecutionException, InterruptedException {
        LocalDateTime dateTime = LocalDateTime.now();
        LoggerService loggerService = new LoggerService();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        this.log = userLog.getLog() + "\n" + dateTime.format(formatter) + " " + logType + " " + log + "\n";
        loggerService.save(userLog);
    }
}
