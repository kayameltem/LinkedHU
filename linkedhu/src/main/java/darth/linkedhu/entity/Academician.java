package darth.linkedhu.entity;

import com.google.gson.annotations.SerializedName;
import darth.linkedhu.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Academician extends User{
    public Academician(String nationalId){
        this.setNationalId(nationalId);
    }

    @SerializedName("type")
    private UserType type = UserType.ACADEMICIAN;

    @SerializedName("profession")
    private String profession;

    @SerializedName("title")
    private String title;
}
