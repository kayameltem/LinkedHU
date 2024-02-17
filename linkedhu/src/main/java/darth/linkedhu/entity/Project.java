package darth.linkedhu.entity;

import com.google.gson.annotations.SerializedName;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Project extends Announcements {

    @SerializedName("profession")
    private String profession;

    @SerializedName("supervisor")
    private String supervisor;
}
