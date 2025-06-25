import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

/**
 * Form to input URL and trigger generation.
 *
 * @param props - Props containing state and handler references.
 */
export const ThumbnailForm = ({
  url,
  setUrl,
  loading,
  handleSubmit,
}: {
  url: string;
  setUrl: (url: string) => void;
  loading: boolean;
  handleSubmit: () => void;
}) => (
  <div className="space-y-4">
    <Label htmlFor="url">Website URL</Label>
    <div className="flex gap-4">
      <Input
        id="url"
        type="url"
        placeholder="e.g. firmmo.org"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1"
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </Button>
    </div>
  </div>
);
