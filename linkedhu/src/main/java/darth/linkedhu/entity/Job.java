package darth.linkedhu.entity;

import com.google.gson.annotations.SerializedName;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class Job extends Announcements {

    @SerializedName("profession")
    private String profession;
}
