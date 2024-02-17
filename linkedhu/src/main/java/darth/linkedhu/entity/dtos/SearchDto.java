package darth.linkedhu.entity.dtos;

import com.google.gson.annotations.SerializedName;
import darth.linkedhu.entity.User;
import darth.linkedhu.enums.UserType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SearchDto {
    @SerializedName("Mail")
    String mail;
}
