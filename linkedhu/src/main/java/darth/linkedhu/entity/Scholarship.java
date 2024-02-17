package darth.linkedhu.entity;

import com.google.gson.annotations.SerializedName;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Scholarship extends Announcements {
    @SerializedName("worth")
    private String worth;
}
