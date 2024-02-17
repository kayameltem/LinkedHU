package darth.linkedhu.entity;

import com.google.gson.annotations.SerializedName;
import darth.linkedhu.enums.UserType;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
public class Undergraduate extends User{
    public Undergraduate(String nationalId){
        this.setNationalId(nationalId);
    }

    private UserType type = UserType.UNDERGRADUATE;

    @SerializedName("studentId")
    private String studentId;
}
