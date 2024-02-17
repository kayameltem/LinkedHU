package darth.linkedhu.entity;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @SerializedName("announcementId")
    private String announcementId;

    @SerializedName("mail")
    private String mail;

}
