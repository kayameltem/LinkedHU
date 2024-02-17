package darth.linkedhu.entity;

import com.google.gson.annotations.SerializedName;
import darth.linkedhu.enums.UserType;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.ArrayList;

@Data
@NoArgsConstructor
public class Graduate extends User{
    public Graduate(String nationalId){
        this.setNationalId(nationalId);
    }

    private UserType type = UserType.GRADUATE;

    @SerializedName("studentId")
    private String studentId;


    private ArrayList<String> profession;

    private String degree;

    private String title;
}
