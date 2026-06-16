import { redirect } from "next/navigation";

/**
 * /lab merged into the unified /work index (redundancy cleanup): its field-note
 * content was a duplicate of the field-notes/ directory there. Permanent redirect
 * keeps old links and the OFF-PROD references alive.
 */
export default function LabPage() {
  redirect("/work#field-notes");
}
