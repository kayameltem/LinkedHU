package darth.linkedhu.entity;

import com.google.gson.annotations.SerializedName;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Internship extends Announcements {
    @SerializedName("salary")
    private String salary;
}
